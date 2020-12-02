const sessionsRepository = require("../repositories/sessionsRepository");
const userRepository = require("../repositories/userRepository");

async function authenticate(req, res, next){
    try{
        const authHeader = req.header('Authorization');

        if(!authHeader) return res.status(401).send({ error: 'Auth header not found' });

        const token = authHeader.replace('Bearer ', '');

        const session = await sessionsRepository.findSession(token);

        if(!session) return res.status(401).send({ error: 'Token inválido' });

        const user = await userRepository.findUserById(session.userId);
        req.user = user;
        next();
    }catch(err){
        res.status(500).send({ error: "Erro de servidor" });
    }
   
}

module.exports = { authenticate }