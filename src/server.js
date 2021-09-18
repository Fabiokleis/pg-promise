const express = require('express');
const dotenv = require('dotenv').config();
const User_router = require('./routes/user_route.js');
const db = require('./infra/database.js');
const app = express();

async function testConnection() {
    const cn = await db.connect();
    cn.done();
    return cn.client;
}

testConnection().then(obj => console.log(obj));

app.use('/user', User_router);


app.listen(process.env.PORT, (err) => { 
    if (err) throw err;
    console.log(`connected on ${process.env.PORT}`); 
});
