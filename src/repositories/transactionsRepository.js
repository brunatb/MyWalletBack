const connection = require("../database");

async function findTransactions(id){
    const result = await connection.query('SELECT * FROM transactions WHERE "userId" = $1', [id]);
    return result.rows;
}

module.exports = { findTransactions }