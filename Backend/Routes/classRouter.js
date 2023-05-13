const express = require("express");
const router = express.Router();
const classControllers = require("../Controllers/classControllers");
const protect = require("../Controllers/protectController");



router.post("/createClass", protect.Protect, classControllers.createClass);
// router.post('/addClassToGym', classControllers.addClassToGym);
router.get("/getAllClasses", classControllers.getAllClasses);
router.get("/getClassByID", classControllers.getClassById);
router.put("/updateClass/:id", classControllers.updateClass);
router.delete("/removeGyms/:id", classControllers.deleteClass);

module.exports = router;
