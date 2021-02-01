/* eslint-disable prefer-const */
const stripHtml = require('string-strip-html');
const connection = require('../database');

async function findTransactions(id) {
  const result = await connection.query('SELECT date, description, value, id FROM transactions WHERE "userId" = $1', [id]);
  return result.rows;
}

async function createTransaction(id, body) {
  let { value, description } = body;
  description = stripHtml(description).result;
  await connection.query('INSERT INTO transactions (description, value, "userId") VALUES ($1, $2, $3)', [description, value, id]);
}

module.exports = { findTransactions, createTransaction };
