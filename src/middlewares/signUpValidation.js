const signUpSchema = require('../schemas/signUpSchema');

function validateSignUpInputs(req,res, next){
    const userInfo = req.body;
    const { error } =  signUpSchema.signUp.validate(userInfo);
    if(error) return res.status(422).send({ error: error.details[0].message })
    else next();
}

module.exports = { validateSignUpInputs }