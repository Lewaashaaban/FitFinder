const express = require('express');
const router = express.Router();
const scheduleController = require('../Controllers/scheduleController');

router.post('/createSchedule',scheduleController.createSchedule);
router.put('/updateSchedule/:id',scheduleController.updateSchedule);
// router.get('/getScheduleByID', scheduleController.getScheduleById);
// router.get('/getAllClasses',scheduleController.getAllSchedules);


module.exports = router;