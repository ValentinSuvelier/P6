const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

/* S'assure que 2 utilisateurs ne puissent pas utiliser la même addresse mail */
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);