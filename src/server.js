const express = require('express');

const userRouter = require('./routes/userRoute.js');

const app = express();

app.use('/user', userRouter);


app.listen(3000, () => { console.log('connected '); });
