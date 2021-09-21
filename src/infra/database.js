const pgp = require('pg-promise')({});

const local = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
}

const elephant = process.env.CONNECTION;

const db = pgp(elephant);

module.exports = db;
