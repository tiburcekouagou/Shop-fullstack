function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log({authHeader}) // Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({message: 'Accès refusé. Token manquant.'});
    }   

    // On passe à la route désirée
    next()
}

module.exports = authenticate 