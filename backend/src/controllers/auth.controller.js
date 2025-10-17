const { User } = require("../models/user.model.js");
const { hashValue, verifyHash } = require("../utils/hash.js");
const {
  createAccessToken,
  createRefreshToken,
  timeToMs,
  renewRefreshToken,
} = require("../services/token.service.js");
const { accessTokenExp, refreshTokenExp } = require("../config/index.js");
const config = require("../config/index.js");

/**
 * Inscrire un nouvel utilisateur
 * @param {*} req requête
 * @param {*} res réponse
 */
const register = async (req, res) => {
  // Récupérer les données du formulaire

  const { email, username, password } = req.body;

  // Vérifier que tous les champs sont remplis
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs" });
  }

  // Vérifier que l'email n'est pas déjà utilisé
  const exist = await User.findOne({ email: email });
  if (exist) {
    return res.status(400).json({ message: "Cet email est déjà utilisé" });
  }

  // Hasher le mot de passe
  const hashedPassword = await hashValue(password);

  // Créer le nouvel utilisateur
  const newUser = await User.create({
    name: username,
    email: email,
    password: hashedPassword, // stocker le mot de passe hashé
  });

  res.status(201).json({
    message: "Utilisateur créé avec succès",
    user: { id: newUser._id, email: newUser.email },
  });
};

/**
 * Connexion d'un utilisateur
 * @param {Object} req requête
 * @param {Object} res réponse
 */
const login = async (req, res) => {
  // Récupérer les données du formulaire
  const { email, password } = req.body;

  // Vérifier que tous les champs sont remplis
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs" });
  }

  // Vérifier que l'utilisateur existe
  const user = await User.findOne({ email: email });

  // Si l'utilisateur n'existe pas
  if (!user) {
    // responder avec un message d'erreur
    return res.status(400).json({ message: "Email ou mot de passe incorrect" });
  }

  // Vérifier que le mot de passe est correct
  const isPasswordValid = await verifyHash(user.password, password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Email ou mot de passe incorrect" });
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
  });
  const refreshToken = await createRefreshToken(
    user._id.toString(),
    req.get("User-Agent")
  );

  // Envoyer le refresh token dans un cookie httpOnly
  // Le cookie sera stocké par le navigateur et renvoyé automatiquement au serveur à chaque requête
  // httpOnly empêche l'accès au cookie via JavaScript (document.cookie)
  res.cookie(
    "refreshToken",
    JSON.stringify({ jti: refreshToken.jti, token: refreshToken.token }),
    {
      httpOnly: true,
      expires: new Date(Date.now() + timeToMs(refreshTokenExp)), // durée de vie du cookie
      // maxAge: timeToMs(refreshTokenExp), // durée de vie du cookie
    }
  )
  .cookie("accessToken", accessToken, {
    expires: new Date(Date.now() + timeToMs(accessTokenExp)),
    httpOnly: false, // accessible via JavaScript
  });

  console.log("Access Token", accessToken);
  console.log("Access Token Expiration (ms):", timeToMs(accessTokenExp));
  console.log("Refresh Token", refreshToken);

  // // Envoyer l'access token dans le cookie
  // res.cookie("accessToken", accessToken, {
  //   maxAge: timeToMs(accessTokenExp), // durée de vie du cookie
  // });

  // Envoyer le token d'accès dans le corps de la réponse
  res.json({ accessToken, expiresAt: timeToMs(accessTokenExp), user: { id: user._id, email: user.email }, });
};

/**
 * Déconnexion d'un utilisateur
 * @param {*} req requête
 * @param {*} res réponse
 */
const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.json({ message: "Déconnexion réussie" });
};

const refresh = async (req, res) => {
  try {
    const cookiesRefreshToken = req.cookies["refreshToken"];

    if (!cookiesRefreshToken)
      return res.status(401).json({
        message: "Aucun refreshToken fournit",
      });

    const { jti, token } = JSON.parse(cookiesRefreshToken);
    const newRt = await renewRefreshToken(jti, token);
    const user = await User.findById(newRt.user);

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });

    // Envoyer le refresh token dans un cookie httpOnly
    // Le cookie sera stocké par le navigateur et renvoyé automatiquement au serveur à chaque requête
    // httpOnly empêche l'accès au cookie via JavaScript (document.cookie)
    res.cookie(
      "refreshToken",
      JSON.stringify({ jti: newRt.jti, token: newRt.token }),
      {
        httpOnly: true,
        maxAge: timeToMs(refreshTokenExp), // durée de vie du cookie
      }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: timeToMs(accessTokenExp), // durée de vie du cookie
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { register, login, refresh };
