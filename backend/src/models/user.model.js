const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Le nom doit contenir au moins 2 caracteres'],
        maxlength: [50, 'Le nom doit contenir au plus 50 caracteres']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Veuillez entrer une adresse email valide']
    },
    password: {
        type: String,
        required: true,
        minlength:  [8, 'Le mot de passe doit contenir au moins 8 caracteres'],
    },
    role: {
        type: String,
        require: true,
        enum: ['admin', 'manager', 'seller', 'user'],
        default: 'user',
        lowercase: true,
    }
},
{
    timestamps: true // <-- createdAt et updatedAt
    
})

// Avant de sauvegarder un utilisateur, hasher le mot de passe
// schema.pre('save', async function(next) {
//     // si le mot de passe n'a pas ete modifie, passer au suivant
//     if (!this.isModified('password')) return next(); 
        
//     const saltRounds = 16; // Nombre de tours de salage
//     const salt = await bcrypt.genSalt(saltRounds); // Generer le sel
    
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
    
// })

// Method pour comparer le mot de passe
// schema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password)
// }

const User = model('User', schema)


module.exports = { User }