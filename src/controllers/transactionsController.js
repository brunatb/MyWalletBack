const transactionsRepository = require('../repositories/transactionsRepository');

async function getTransactions(req, res){
    try{
        const { user } = req;
        const transactions = await transactionsRepository.findTransactions(user.id);

        return res.status(200).send(transactions);

    }catch(err){
        res.status(500).send({ error: "Erro de servidor" })
    }
}

module.exports = { getTransactions }