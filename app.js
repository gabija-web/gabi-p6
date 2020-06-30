const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauces = require('./models/sauces');

const app = express();
// ------------------------------------ CONNECT TO MONGO DB--------------------------------------
mongoose.connect(
    'mongodb+srv://gabi:lE6rCRkGhz1PiaQM@cluster0-2kcd5.mongodb.net/Cluster0?retryWrites=true&w=majority',)
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB Atlas!');
      console.error(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());


module.exports = app;