const cors = require('cors');

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeader: ['Content-Type', 'Authorization'],
    credentials: true, // Autoriser l'envoi des cookies
}

module.exports = cors(corsOptions);