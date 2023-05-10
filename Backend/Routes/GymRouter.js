const express = require('express');
const router = express.Router();
const gymController = require('../Controllers/gymCOntrollers');



// Define routes for the Gym model
router.get('/getGyms', gymController.getGym);
router.post('/CreateGyms', gymController.createGym);
router.put('/updateGyms/:id', gymController.updateGym);
router.delete('/removeGyms/:id', gymController.deleteGym);
router.get('/getGymsByRegion/:region', gymController.countGymsByRegion);

module.exports = router;
