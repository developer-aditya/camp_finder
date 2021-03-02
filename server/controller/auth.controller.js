const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc PUT User Data in DB
// @route /api/v1/auth/register
// @access public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, role, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	const token = user.getSignedJwt();

	res.status(200).json({
		success: true,
		msg: 'User added Successfully ',
		token,
	});
});

// @desc POST to send email/password to Server for auth
// @route /api/v1/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(
			new ErrorResponse(`Please Enter Email and Password`, 400),
		);
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return next(new ErrorResponse(`Invalid Credentials`, 401));
	}

	const verified = await user.validatePassword(password);
	if (!verified) {
		return next(new ErrorResponse(`Invalid Credentials`, 401));
	}

	const token = user.getSignedJwt();

	res.status(200).json({
		success: true,
		msg: 'User authenticated',
		token,
	});
});
