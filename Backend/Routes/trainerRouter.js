const express = require('express');

const router = express.Router();
const trainerController = require('../Controllers/trainerController');

router.post('/addTrainer', trainerController.addTrainers);
router.delete('/removeTrainer', trainerController.removeTrainer);


module.exports = router;