const express = require('express');
const router = express.Router();
const gymController = require('../Controllers/gymCOntrollers');
const protect = require('../Controllers/protectController');

// Define routes for the Gym model
router.get('/getGyms',protect.Protect, gymController.getAllGyms);
router.post('/CreateGyms',protect.Protect, gymController.createGym);
router.patch('/updateGym/:id',protect.Protect, gymController.updateGym);
router.delete('/deleteGym/:id',protect.Protect, gymController.deleteGym);
router.get('/getGymsByRegion/:region',protect.Protect, gymController.countGymsByRegion);
router.get('/getGymDetails/:id' ,protect.Protect, gymController.getGymDetails);

module.exports = router;
