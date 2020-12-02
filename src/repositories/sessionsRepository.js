const connection = require('../database/index');
const uuid = require('uuid');

async function createSession(user) {
    const token = uuid.v4();
    await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);
    return token;
}

module.exports = { createSession }