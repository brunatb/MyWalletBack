const connection = require('../database/index');

async function create(name, email, password){
    await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
}

async function findUserByEmail(email) {
    const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
    
    return result.rows;
}

async function findUserById(id){
    const result = await connection.query('SELECT * FROM users WHERE id = $1', [id]);

    return result.rows[0];
}

module.exports = {  create, findUserByEmail, findUserById }