const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/nouveau', clientController.nouveau);   // affiche le formulaire
router.post('/nouveau', clientController.creer);    // traite le formulaire

module.exports = router;