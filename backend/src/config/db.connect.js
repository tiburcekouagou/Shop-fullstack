const mongoose = require("mongoose");
const config = require("./index.js");

const connectDatabase = async () => {
    try { 
        await mongoose.connect(config.mongodbUri)
    } catch (error) {
        console.error('Erreur survenue lors de la connexion: ', error.message);
    }
}

module.exports = connectDatabase;