const express = require('express');
const router = express.Router();
const {
	register,
	login,
	getMe,
	forgotPassword,
	resetPassword,
	updateUser,
	updatePassword,
	logout,
} = require('../controller/auth.controller');
const { protected } = require('../middleware/auth');

router.route('/logout').get(logout);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protected, getMe);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetPasswordToken').put(resetPassword);
router.route('/updateuser').put(protected, updateUser);
router.route('/updatepassword').put(protected, updatePassword);

module.exports = router;
