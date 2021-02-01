/* eslint-disable no-console */
/* eslint-disable consistent-return */
const transactionsRepository = require('../repositories/transactionsRepository');
const userRepository = require('../repositories/userRepository');
const sessionsRepository = require('../repositories/sessionsRepository');

async function getTransactions(req, res) {
  try {
    const { user } = req;
    const transactions = await transactionsRepository.findTransactions(user.id);

    return res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send({ error: 'Erro de servidor' });
  }
}

async function postTransactions(req, res) {
  try {
    const { user } = req;
    await transactionsRepository.createTransaction(user.id, req.body);
    await userRepository.updateUserAmount(user.id, user.amount, req.body.value);

    const result = await userRepository.findUserByEmail(user.email);
    const token = await sessionsRepository.getToken(user.id);

    res.status(201).send({
      id: user.id, name: user.name, amount: result[0].amount, token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Erro de servidor' });
  }
}

module.exports = { getTransactions, postTransactions };
