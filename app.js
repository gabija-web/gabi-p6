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
//  ---------------------------------------- POST REQUEST  ---------------------------------------------------------
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
//   ------------------------------------------ GET SAUCES BY ID & UPDATE SAUCE -------------------------------------------------------
  app.get('/api/sauces/:id', (req, res, next) => {
    Sauces.findOne({
      _id: req.params.id
    }).then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });

  app.put('/api/stuff/:id', (req, res, next) => {
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
    Sauces.updateOne({_id: req.params.id}, sauces).then(
      () => {
        res.status(201).json({
          message:'Sauce update successfully'
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
  //  -------------------------------------- DELETE SAUCE ---------------------------


// ------------------------------------------------------------- GET SAUCES LIST ----------------------------------------------
app.use('/api/sauces', (req, res, next) => {
    Sauces.find().then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

module.exports = app;