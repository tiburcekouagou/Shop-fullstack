const jwt = require("jsonwebtoken");
const config = require("../config/index.js");
const { hashValue, verifyHash } = require("../utils/hash.js");
const { RefreshToken } = require("../models/refreshToken.model.js");
const crypto = require("crypto");

/**
 * Créer un token d'accès (access token) JWT
 * @param {Object} payload les données à inclure dans le token (ex: { userId: user._id, role: user.role })
 * @returns {String} le token JWT
 */
function createAccessToken(payload) {
  return jwt.sign(
    payload, // e.g., { userId: user._id, role: user.role }
    config.accessTokenSecret, // clé secrète
    { expiresIn: config.accessTokenExp } // options (expiration, etc.
  );
}

/**
 * Créer un refresh token JWT
 * @param {string} userId identifiant de l'utilisateur
 * @param {string} userAgent agent utilisé
 * @returns refresh token
 */
async function createRefreshToken(userId, userAgent) {
  // Représente le token avant hashage
  const token = crypto.randomBytes(64).toString("hex"); // 128 caractères hexadécimaux

  // Identifiant unique du token (JWT ID)
  const jti = crypto.randomBytes(16).toString("hex"); // 32 caractères hexadécimaux

  // Date d'expiration
  const expiresAt = new Date(Date.now() + timeToMs(config.refreshTokenExp)); // date d'expiration en millisecondes

  // Hasher le token avant de le stocker en base de données
  const tokenHash = await hashValue(token);

  // Créer le le refresh token
  await RefreshToken.create({
    user: userId,
    jti: jti,
    tokenHash: tokenHash,
    expiresAt: expiresAt,
    userAgent: userAgent,
  });

  return { token, jti, expiresAt };
}

/**
 * Convertir un temps sous la forme 15m, 30d, 1h en millisecondes
 * @param {string} time temps sous la forme 15m, 30d, 1h
 * @returns temps en millisecondes
 */
function timeToMs(time) {
  // 15m, 30d, 1h
  if (time.endsWith("d")) return parseInt(time) * 24 * 60 * 60 * 1000; // jours
  if (time.endsWith("h")) return parseInt(time) * 60 * 60 * 1000;
  if (time.endsWith("m")) return parseInt(time) * 60 * 1000;
  return parseInt(time) * 1000;
}

async function renewRefreshToken(jti, token) {
  // vérifier si le jti exist dans la BDD
  const rt = await RefreshToken.findOne({ jti });

  // si le token n'existe pas ou a été révoqué
  if (!rt || rt.revoked) throw new Error("Token invalide");

  // vérifier que le token correspond au hash stocké
  const isTokenValid = await verifyHash(rt.tokenHash, token);

  if (!isTokenValid) throw new Error("Token invalide");

  rt.revoked = true; // révoquer l'ancien token
  await rt.save();

  // créer un nouveau refresh token
  const newRt = await createRefreshToken(rt.user.toString(), rt.userAgent);

  return newRt;
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  timeToMs,
  renewRefreshToken,
};
