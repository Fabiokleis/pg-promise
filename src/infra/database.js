const pgp = require('pg-promise')({});

const cn = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
}

const db = pgp(cn);

module.exports = db;
