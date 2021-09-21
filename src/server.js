const express = require('express');
const dotenv = require('dotenv').config();
const User_router = require('./routes/userRoute.js');
const db = require('./infra/database.js');
const app = express();

async function testConnection() {
    const cn = await db.connect();
    cn.done();
    return cn.client;
}

try {
    testConnection()
} catch (err) {
    throw err;
}

app.use('/user', User_router);


app.listen(process.env.PORT, (err) => { 
    if (err) throw err;
    console.log(`connected on ${process.env.PORT}`); 
});
