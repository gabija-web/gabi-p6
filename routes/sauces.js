const express = require('express');
const router = express.Router();
const saucesCtrl =require('../controllers/sauces');

const Sauces = require('../models/sauces');

//  ---------------------------------------- POST REQUEST  ---------------------------------------------------------
router.post('/', saucesCtrl.createSauces);
//   ------------------------------------------ GET SAUCES BY ID & UPDATE SAUCE -------------------------------------------------------
router.get('/:id', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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
router.delete('/:id', (req, res, next) => {
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

// ------------------------------------------------------------- GET SAUCES LIST ----------------------------------------------
router.get('/', (req, res, next) => {
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

module.exports = router;