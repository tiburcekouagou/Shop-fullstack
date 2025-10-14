const mongoose = require("mongoose");
const MONGOOSE_URI = process.env.MONGOOSE_URI;

const connectDatabase = async () => {
    try { 
        await mongoose.connect(MONGOOSE_URI)
        console.log('Connexion à la bdd MongoDB');
    } catch (error) {
        console.error('Erreur survenue lors de la connexion: ', error.message);
    }
}

module.exports = connectDatabase;