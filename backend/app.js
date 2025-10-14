require('dotenv').config();
const express = require('express');
const port = process.env.PORT|| 3000;
const connectDatabase = require('./src/config/dbConnect.js');
const corsConfig = require('./src/config/corsConfig.js');
const authRoutes = require('./src/routes/authRoutes.js');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

// helmet pour la securité
app.use(helmet());
// logguer les requetes
app.use(morgan('dev'))
app.use(express.json())

// Connexion à la base de donnee
connectDatabase();

// CORS
app.use(corsConfig)


// Routes
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({message: 'Welcome to my website!'});
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    
})