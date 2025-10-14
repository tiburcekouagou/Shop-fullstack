const {User} = require('../models/user.model.js');
const { hashValue, verifyHash } = require('../utils/hash.js');
const { createAccessToken, createRefreshToken } = require('../services/token.service.js');
const { acessTokenExp } = require('../config/index.js');

/**
 * Inscrire un nouvel utilisateur
 * @param {*} req requête 
 * @param {*} res réponse
 */
const register = async (req, res) => {
    // Récupérer les données du formulaire
    console.log({body: req.body});
    
    const { email, username, password } = await req.body;

    // Vérifier que tous les champs sont remplis
    if (!email || !username || !password) {
        return res.status(400).json({message: 'Veuillez remplir tous les champs'});
    }

    // Vérifier que l'email n'est pas déjà utilisé
    const exist = await User.findOne({email: email})
    if (exist) {
        return res.status(400).json({message: 'Cet email est déjà utilisé'});
    }

    // Hasher le mot de passe
    const hashedPassword = await hashValue(password);
    
    // Créer le nouvel utilisateur
   const newUser = await User.create({
    name: username, 
    email: email, 
    password: hashedPassword, // stocker le mot de passe hashé
})

    res.status(201).json({
        message: 'Utilisateur créé avec succès', 
        user: {id: newUser._id, email: newUser.email}
    })
}

/**
 * Connexion d'un utilisateur
 * @param {Object} req requête
 * @param {Object} res réponse
 */
const login = async (req, res) => {
    // Récupérer les données du formulaire
    const {email, password}  = req.body

    // Vérifier que tous les champs sont remplis
    if (!email || !password) {
        return res.status(400).json({message: 'Veuillez remplir tous les champs'});
    }

    // Vérifier que l'utilisateur existe
    const user = await User.findOne({email: email});

    // Si l'utilisateur n'existe pas
    if (!user) {
        // responder avec un message d'erreur
        return res.status(400).json({message: 'Email ou mot de passe incorrect'});
    }

    // Vérifier que le mot de passe est correct
    const isPasswordValid = await verifyHash(user.password, password);

    if (!isPasswordValid) {
        return res.status(400).json({message: 'Email ou mot de passe incorrect'});
    }

    const accessToken = createAccessToken({ userId: user._id, role: user.role });
    const refreshToken = await createRefreshToken(user._id.toString(), req.get('User-Agent'));

    // 
    res.cookie('refreshToken', JSON.stringify(
        {jti: refreshToken.jti, token: refreshToken.token}
    ))

    res.json({ accessToken })
}

/**
 * Déconnexion d'un utilisateur
 * @param {*} req requête
 * @param {*} res réponse
 */
const logout = (req, res) => {
    console.log('Deconnexion');
}

module.exports = { register, login }