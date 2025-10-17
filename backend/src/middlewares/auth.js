const config = require("../config");
const { User } = require("../models/user.model");

async function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log({authHeader}) // Bearer TOKEN
    const token = authHeader && authHeader.startsWith('Bearer') 
    ? authHeader.split(' ')[1]
    : req.cookies && req.cookies.accessToken; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({message: 'Accès refusé. Token manquant.'});
    }   

    try {
        const payload = jwt.verify(token, config.accessTokenSecret);
        // Option A: Attacher les informations de l'utilisateur à la requête
        // req.user = {
        //     id: payload.userId,
        //     role: payload.role,
        // };

        // Option B: Récupérer l'utilisateur complet depuis la base de données
        const user = await User.findById(payload.userId).select('-password');
        if (!user) {
            return res.status(401).json({message: 'Utilisateur non trouvé.'});
        }

        // Attacher l'utilisateur à la requête
        req.user = user;
    } catch (error) {
        return res.status(401).json({message: 'Token invalide ou expiré.'});
    }
    // On passe à la route désirée
    next()
}

function requireRole(role) {
    return function (req, res, next) {
        if (!req.user) return res.status(401).json({ message: 'Utilisateur non authentifié.' });
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès refusé. Rôle insuffisant.' });
        }
        next();
    }
}

module.exports = {authenticate, requireRole}; 