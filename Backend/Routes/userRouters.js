const express = require('express');
const router = express.Router();
const registerController = require('../Controllers/UserControllers');

router.post('/signup', registerController.signingUp);
router.post('/signin', registerController.signingIn);
router.post('/forgotPassword', registerController.forgotPassword);
router.patch('/resetPassword', registerController.resetPassword);


module.exports = router;
