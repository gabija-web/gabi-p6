const express = require('express');
const router = express.Router();
const saucesCtrl =require('../controllers/sauces');

router.get('/:id', saucesCtrl.getOneSauces);
router.get('/', saucesCtrl.getAllSauces);
router.put('/:id', saucesCtrl.modifySauces);
router.delete('/:id', saucesCtrl.deleteSauces);
router.post('/', saucesCtrl.createSauces);

module.exports = router;