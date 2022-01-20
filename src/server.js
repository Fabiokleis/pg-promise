const express = require('express');
//const dotenv = require('dotenv').config();
const userRouter = require('./routes/userRoute.js');
const db = require('./infra/database.js');
const app = express();

/*
async function testConnection() {
    const cn = await db.connect();
    cn.done();
    return cn.client;
}

try {
    testConnection();
} catch (err) {
    throw err;
}
*/
app.get('/', (req, res) => {
    res.send("Hello, World!");
});
app.use('/user', userRouter);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json(err.message || 'server internal error! try again later...');
});

app.listen(process.env.PORT, (err) => { 
    if (err) throw err;
    console.log(`connected on ${process.env.PORT}`); 
});
