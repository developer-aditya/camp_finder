const express = require('express');
const router = express.Router();
const {
	register,
	login,
	getMe,
	forgotPassword,
	resetPassword,
} = require('../controller/auth.controller');
const { protected } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protected, getMe);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetPasswordToken').put(resetPassword);

module.exports = router;
