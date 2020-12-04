const connection = require("../database");
const stripHtml = require('string-strip-html');

async function findTransactions(id){
    const result = await connection.query('SELECT date, description, value, id FROM transactions WHERE "userId" = $1', [id]);
    return result.rows;
}

async function createTransaction(id, body) {
    let { value, description } = body;
    value = stripHtml(value).result;
    description = stripHtml(description).result
    await connection.query('INSERT INTO transactions (description, value, "userId") VALUES ($1, $2, $3)', [description, value, id]);
}

module.exports = { findTransactions, createTransaction }