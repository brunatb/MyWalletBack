const signInSchema = require('../schemas/signInSchema');

function validateSignInInputs(req,res, next){
    const userInfo = req.body;
    const { error } =  signInSchema.signIn.validate(userInfo);
    if(error) return res.status(422).send({ error: error.details[0].message })
    else next();
}

module.exports = { validateSignInInputs }