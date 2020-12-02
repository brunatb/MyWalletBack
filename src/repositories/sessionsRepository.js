const connection = require('../database/index');
const uuid = require('uuid');

async function createSession(user) {
    const token = uuid.v4();
    await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);
    
    return token;
}

async function findSession(token){
    const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);

    return result.rows[0];
}

module.exports = { createSession, findSession }