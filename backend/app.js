require('dotenv').config();
const express = require('express');
const port = process.env.PORT|| 3000;
const connectDatabase = require('./src/config/db.connect.js');
const corsConfig = require('./src/config/corsConfig.js');
const authRoutes = require('./src/routes/auth.routes.js');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

// Middlewares
app.use(helmet()); // Pour securiser les en-tetes HTTP
app.use(morgan('dev')) // Pour logger les requetes HTTP
app.use(express.json()) // Pour parser les donnees JSON
app.use(express.urlencoded({ extended: true })) // Pour parser les donnees x-www-form-urlencoded

// Routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my website!'});
})

app.use('/api/auth', authRoutes)

// Connexion à la base de donnee
connectDatabase();

// CORS
app.use(corsConfig) // Configurer CORS apres les routes


module.exports = app;