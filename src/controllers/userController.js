const bcrypt = require('bcrypt');
const sessionsRepository = require('../repositories/sessionsRepository');
const userRepository = require('../repositories/userRepository');

async function postSignUp(req, res){
    const { name, email, password} = req.body;
    try{
        
        const result = await userRepository.findUserByEmail(email);
        
        if(result.length !== 0) return res.status(409).send({ error: "Email já existente" });
        
        const passwordHash = bcrypt.hashSync(password, 10);
        await userRepository.create(name, email, passwordHash);
    
        res.sendStatus(201);
    }catch(err){
        res.status(500).send({ error: "Erro de servidor" });
    }
    
}

async function postSignIn(req, res){
    const { email, password } = req.body;
    try{
        
        const user = await userRepository.findUserByEmail(email);
        
        if(user.length === 0) return res.status(409).send({ error: "Email não cadastrado!" });
        
        if(!bcrypt.compareSync(password, user[0].password)) return res.status(401).send({error: "Senha incorreta!"});
        
        const token = await sessionsRepository.createSession(user[0]);

        res.status(200).send({id: user[0].id, name: user[0].name, amount: user[0].amount, token});

    }catch(err){
        res.status(500).send({ error: "Erro de servidor" });
    }
    

}

module.exports = { postSignUp, postSignIn }
