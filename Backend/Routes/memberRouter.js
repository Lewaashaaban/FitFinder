const express = require('express');

const router = express.Router();
const memberController = require('../Controllers/memberControllers');

router.post('/addMember', memberController.addMembers);
router.delete('/removeMember', memberController.removeMembers);
router.post('/addMemberToClass',memberController.addMemberToClass)


module.exports = router;