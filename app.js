const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauces = require('./models/sauces');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.post('/api/sauces', (req, res, next) => {
      const sauces = new Sauces({
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
      });
      sauces.save().then(
          () => {
              res.status(201).json({
                  message: 'Sauces saved successfully'
              });
          }
      ).catch(
          (error) => {
              res.status(400).json({
                  error: error
              });
          }
      );
  });

app.use('/api/sauces', (req, res, next) => {
    const sauces = [
        {
            _id: '454dsfd5gfdgf5',
            userId: '032519',
            name: 'devil sauce',
            manufacturer: 'Pekocko',
            description: 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content.',
            mainPepper: 'chili pepper',
            imageUrl: '',
            heat: 12,
            likes: 5,
            dislikes: 0,
            usersLiked: [''],
            usersDisliked: [''],
        },
        {
            _id: '302dsfd5gfdgf5',
            userId: '594519',
            name: 'huracane sauce',
            manufacturer: 'Pekocko',
            description: 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content.',
            mainPepper: 'chili pepper',
            imageUrl: '',
            heat: 10,
            likes: 5,
            dislikes: 0,
            usersLiked: [''],
            usersDisliked: [''],
        },
    ];
    res.status(200).json(sauces);
});

module.exports = app;