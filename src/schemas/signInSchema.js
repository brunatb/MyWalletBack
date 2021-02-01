const Joi = require('joi');

const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { signIn };
