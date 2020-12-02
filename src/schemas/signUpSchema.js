const Joi = require('joi');

const signUp = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    confirmPassword: Joi.ref('password'),
});

module.exports = { signUp }