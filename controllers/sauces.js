const Sauces = require('../models/sauces');
const fs = require('fs');

exports.createSauces = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  req.body.sauces =JSON.parse(req.body.sauces);
    const sauces = new Sauces({
      userId: req.body.sauces.userId,
      name: req.body.sauces.name,
      manufacturer: req.body.sauces.manufacturer,
      description: req.body.sauces.description,
      mainPepper: req.body.sauces.mainPepper,
      imageUrl: url + '/images' + req.file.filename,
      heat: req.body.sauces.heat,
      likes: req.body.sauces.likes,
      dislikes: req.body.sauces.dislikes,
      usersLiked: req.body.sauces.usersLiked,
      usersDisliked: req.body.sauces.usersDisliked,
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
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauces =JSON.parse(req.body.sauces);
      sauces = {
        _id: req.params.id,
        userId: req.body.sauces.userId,
        name: req.body.sauces.name,
        manufacturer: req.body.sauces.manufacturer,
        description: req.body.sauces.description,
        mainPepper: req.body.sauces.mainPepper,
        imageUrl: url + '/images' + req.file.filename,
        heat: req.body.sauces.heat,
        likes: req.body.sauces.likes,
        dislikes: req.body.sauces.dislikes,
        usersLiked: req.body.sauces.usersLiked,
        usersDisliked: req.body.sauces.usersDisliked,
    };
    } else {
      sauces = {
        _id: req.params.id,
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
      };