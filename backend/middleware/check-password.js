const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le MDP doit faire 8 caractères au moins, avec une maj, une min et un chiffre au moins et aucun espace.' });
    } else {
        next();
    }
};