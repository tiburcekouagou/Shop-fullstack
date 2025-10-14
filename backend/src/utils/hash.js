const argon2 = require('argon2');

// JS Doc

/**
 * Fonction utilitaire pour hasher une valeur en utilisant argon2.
 * @param { string } value  valeur à hasher
 * @returns  valeur hashée
 */
async function hashValue(value) {
    return await argon2.hash(value);
}

/**
 * Fonction utilitaire pour vérifier une valeur par rapport à un hash.
 * @param { string } hash hash
 * @param { string } plainValue valeur en clair 
 * @returns true si la valeur correspond au hash, false sinon
 */
async function verifyHash(hash, plainValue) {
    return await argon2.verify(hash, plainValue);
}

module.exports = { hashValue, verifyHash }