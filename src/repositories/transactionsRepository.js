const connection = require("../database");

async function findTransactions(id){
    const result = await connection.query('SELECT * FROM transactions WHERE "userId" = $1', [id]);
    return result.rows;
}

async function createTransaction(id, body) {
    const { value, description } = body;
    await connection.query('INSERT INTO transactions (description, value, "userId") VALUES ($1, $2, $3)', [description, value, id]);
}

module.exports = { findTransactions, createTransaction }