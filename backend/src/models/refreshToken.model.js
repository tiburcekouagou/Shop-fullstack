const { Schema, model } = require('mongoose');

const refreshTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // JSON Web Token ID
    jti: {
        type: String,
        required: true,
        index: true,
    },
    tokenHash: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    revoked: {
        type: Boolean,
        default: false,
    },
    userAgent: { type: String }, // agent utilisateur ( navigateur, application)
}, {
    timestamps: true, // <-- createdAt et updatedAt
})

// Supprimer le token après son expiration
// L'index expireAfterSeconds doit etre defini sur 0 pour que MongoDB supprime le document a la date indiquee dans expiresAt
refreshTokenSchema.index({ expiresAt: 1}, { expireAfterSeconds: 0})

const RefreshToken = model('refreshToken', refreshTokenSchema);
// Exporter le modele
module.exports = { RefreshToken }