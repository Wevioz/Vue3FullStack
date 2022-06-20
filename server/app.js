const express = require('express');
const app = express();
const cors = require('cors');
const corsOption = {
    exposedHeaders: "x-auth-token"
}
require('express-async-errors');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Mongo Bdd
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://Wevioz:${process.env.MONGO_PASSWORD}@cluster0.q9sshxs.mongodb.net/hitema?retryWrites=true&w=majority`)
    .then(() => console.log('Connected to mango'))
    .catch((err) => console.log("Not connected to database", err));

// Schéma et classes Mongoose
const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);
const taskSchema = new mongoose.Schema({
    id: Number,
    description: String,
    faite: Boolean,
    creePar: Number
});
const Task = mongoose.model('Task', taskSchema);

// Check variables d'environnements
if (!process.env.SECRET_KEY) {
    console.error("Error : Variable d'environnement 'SECRET_KEY' inexistante -- Exit Program");
    process.exit(1);
}

// Middleware
app.use(express.json());

app.use(cors(corsOption));

// - Authentification
function authenticationToken(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) {
        throw new Error('Vous devez vous connecté pour accéder à cette ressource');
    }
    try {
        const userInToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = userInToken;
        next();
    } catch (error) {
        throw new Error('Le token que vous avez fourni est invalide');
    }
}

// Routes Taches
// app.get('/task', async (req, res) => {
//     const taches = await Task.find();
//     res.status(200).send(taches);
// });
// app.get('/task/:id', async (req, res) => {
//     const tache = await Task.findOne({id: parseInt(req.params.id)});
//     if (!tache) {
//         throw new Error('Aucune tache trouvée');
//     }
//     res.status(200).send(tache);
// });

// app.post('/task', [authenticationToken], async (req, res) => {
//     const payload = req.body;
//     const scheme = Joi.object({
//         id: Joi.allow(),
//         description: Joi.string().max(255).required(),
//         faite: Joi.boolean().required()
//     });
//     const {value, error} = scheme.validate(payload);
//     if (error) {
//         throw new Error(error.details[0].message);
//     }
//     value.creePar = req.user.id;
//     const task = new Task(value);
//     await task.save();
//     res.status(201).send(value);
// });
// app.put('/task/:id', [authenticationToken], async (req, res) => {
//     if (parseInt(req.params.id) === NaN) {
//         throw new Error("Ceci n'est pas une clé valable");
//     }
//     const payload = req.body;
//     const scheme = Joi.object({
//         description: Joi.string().max(255).required(),
//         faite: Joi.boolean().required()
//     });
//     const {value, error} = scheme.validate(payload);
//     if (error) {
//         throw new Error(error.details[0].message);
//     }
//     const tache = await Task.findOne({id: parseInt(req.params.id)});
//     tache.description = payload.description;
//     tache.faite = payload.faite;
//     const modified = await tache.save();

//     res.status(200).send(modified);
// });

// app.delete('/task/:id', [authenticationToken], async (req, res) => {
//     if (parseInt(req.params.id) === NaN) {
//         throw new Error("Ceci n'est pas une clé valable");
//     }

//     const tache = await Task.findOne({id: parseInt(req.params.id)});
//     if (parseInt(req.user.id) !== parseInt(tache.creePar)) {
//         throw new Error("Vous ne pouvez pas supprimer la tâche d'un autre utilisateur");
//     }
//     await Task.deleteOne({id: parseInt(req.params.id)})
//     res.status(200).send("Ressources supprimée");
// });

// Route Login - Register
app.post('/register', async (req, res) => {
    const payload = req.body;
    // Joi
    const scheme = Joi.object({
        id: Joi.allow(),
        email: Joi.string().max(255).email().required(),
        username: Joi.string().max(255).required(),
        password: Joi.string().max(255).required()
    });
    const {value, error} = scheme.validate(payload);
    if (error) {
        throw new Error(error.details[0].message);
    }
    // Vérification d'un compte existant en base de données
    const user = await User.findOne({email: value.email});
    if (user) {
        throw new Error("Un compte existe déja");
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(value.password, salt);
    value.password = passwordHash;
    const userCreated = new User(value);
    await userCreated.save();

    const lastUser = await User.find().sort({ _id: -1 }).limit(1)
    const token = jwt.sign({id: lastUser._id}, process.env.SECRET_KEY);
    res.header('x-auth-token', token).status(201).send({"user": lastUser[0]});
});

app.post('/login', async (req, res) => {
    const payload = req.body;
    const scheme = Joi.object({
        email: Joi.string().max(255).email().required(),
        password: Joi.string().max(255).required()
    });
    const {value, error} = scheme.validate(payload);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const user = await User.findOne({email: value.email});

    if (!user) {
        throw new Error("Ce compte n'existe pas");
    }
    const goodHash = await bcrypt.compare(payload.password, user.password);
    if (!goodHash) {
        throw new Error('Mot de passe invalide');
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
    res.header('x-auth-token', token).status(200).send({"user": user});
});

// Middleware d'erreur 400
app.use((err, req, res, next) => {
    res.status(400).send({error: err.message});
});

// Ecoute sur un port
if (process.env.NODE_ENV !== "test") {
// Middleware
    
    app.listen(3001);
}
module.exports = { app, Task, User };