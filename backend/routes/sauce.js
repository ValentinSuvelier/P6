const sauceCtrl = require('../controllers/sauce');
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router  = express.Router();

// on protège nos routes par le middleware auth
router.post('/', auth, multer, sauceCtrl.createSauce)
router.put('/:id', auth, multer, sauceCtrl.updateSauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.post('/:id/like', auth, sauceCtrl.likesAndDislikes)
router.get('/', auth, sauceCtrl.getAllSauces)
router.get('/:id', auth, sauceCtrl.getOneSauce)

module.exports = router;