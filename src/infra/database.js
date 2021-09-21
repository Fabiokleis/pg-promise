const pgp = require('pg-promise')();

const local = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
}

const elephant = process.env.CONNECTION;

const db = pgp(local);

module.exports = db;
