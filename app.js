const express = require('express');
const path = require('path');


const reviewRouter = require('./src/routes/reviews.router')

const app = express();


app.use(express.json()); 
app.use('/reviews', reviewRouter);

module.exports = app;