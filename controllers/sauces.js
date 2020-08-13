const Sauces = require('../models/sauces');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.createSauces = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauces = new Sauces({
      _id: mongoose.Types.ObjectId(),
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
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
};

exports.getOneSauces = (req, res, next) => {
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
  };

  exports.modifySauces = (req, res, next) => {
    let sauces = new Sauces({ _id: req.params._id });
    console.log(req.file)
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauces = {
        _id: req.params.id,
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        // likes: 0,
        // dislikes: 0,
        // usersLiked: [],
        // usersDisliked: [],
    };
    } else {
      sauces = {
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        // imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        // likes: req.body.likes,
        // dislikes: req.body.dislikes,
        // usersLiked: req.body.usersLiked,
        // usersDisliked: req.body.usersDisliked,
      };
    }
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
  };

  exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({_id: req.params.id}).then(
      (sauces) => {
        const filename = sauces.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          Sauces.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Sauce deleted'
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
      }
    );
  };

    exports.getAllSauces = (req, res, next) => {
        Sauces.find().then(
            (sauces) => {
                res.status(200).json(sauces);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
      };

      exports.likeSauce = (req, res, next) => {
        counter = req.body.like;
        Sauces.findOne({_id: req.params.id}).then(
        
            (sauce) => {
              sauce.usersLiked.push(req.body.userId)
              sauce.likes += req.body.like
              console.log(sauce)
              sauce.save().then( 
                () => {}
                ).catch(
                (error) => {
                  res.status(500).json({
                    error: error
                  });
                });
              res.status(200).json({message:'liked'});
            }
                 
        ).catch(
          (error) =>{
          res.status(500).json({
            error: error
          });
        });
       };