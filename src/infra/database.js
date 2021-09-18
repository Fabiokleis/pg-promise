const pgp = require('pg-promise')({});

const cn = {
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWD
}

const db = pgp(cn);

module.exports = db;
