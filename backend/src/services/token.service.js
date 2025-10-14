const jwt = require('jsonwebtoken');
const config = require('../config/index.js');
const { hashValue } = require('../utils/hash.js');
const { RefreshToken } = require('../models/refreshToken.model.js');
const crypto = require('crypto');

console.log({config})
/**
 * Créer un token d'accès (access token) JWT
 * @param {Object} payload les données à inclure dans le token (ex: { userId: user._id, role: user.role })
 * @returns {String} le token JWT
 */
async function createAccessToken(payload) {
    return jwt.sign(
        payload, // e.g., { userId: user._id, role: user.role }
        config.acessTokenSecret, // clé secrète
        { expiresIn : config.acessTokenExp } // options (expiration, etc.
    )
}

/**
 * Créer un refresh token JWT
 * @param {string} userId identifiant de l'utilisateur
 * @param {string} userAgent agent utilisé
 * @returns refresh token
 */
async function createRefreshToken(userId, userAgent) {
    const token = crypto.randomBytes(64).toString('hex'); // 128 caractères hexadécimaux
    const jti = crypto.randomBytes(16).toString('hex'); // 32 caractères hexadécimaux
    const expiresAt = new Date(Date.now() + timeToMs(config.refreshTokenExp)); // date d'expiration en millisecondes
    const tokenHash = await hashValue(token);

    // Créer le le refresh token
    await RefreshToken.create({
        user: userId,
        jti: jti,
        tokenHash: tokenHash,
        expiresAt: expiresAt,
        userAgent: userAgent

    })

    return { token, jti, expiresAt }
}

/**
 * Convertir un temps sous la forme 15m, 30d, 1h en millisecondes
 * @param {string} time temps sous la forme 15m, 30d, 1h
 * @returns temps en millisecondes
 */
function timeToMs(time) {
    // 15m, 30d, 1h
    if (time.endsWith('d')) return parseInt(time) * 24 * 60 * 60 * 1000; // jours
    if (time.endsWith('h')) return parseInt(time) * 60 * 60 * 1000;
    if (time.endsWith('m')) return parseInt(time) * 60 * 1000;
    return parseInt(time) * 1000
}

module.exports = { createAccessToken, createRefreshToken }