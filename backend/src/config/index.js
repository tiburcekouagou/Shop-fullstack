const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    mongodbUri: process.env.MONGOOSE_URI || '',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'your_jwt_access_token_secret',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'your_jwt_refresh_token_secret',
    accessTokenExp: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '15m',
    refreshTokenExp: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '30d',
}

module.exports = config;