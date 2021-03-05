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

	setTokenInCookie(user, res, 200, 'User Registered');
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

	setTokenInCookie(user, res, 200, 'User logged in');
});

// @desc GET logged in user
// @route /api/v1/auth/me
// @access public
exports.getMe = asyncHandler(async (req, res, next) => {
	res.status(200).json({ success: true, data: req.user });
});

// Function to set token in cookie jar in browser
// which is returned to domain for which it is specified
function setTokenInCookie(user, res, statusCode, msg) {
	const token = user.getSignedJwt();
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_Cookie_Expire * 24 * 60 * 60 * 1000,
		),
		sameSite: true,
		httpOnly: true,
	};

	if (process.env.NODE_ENV == 'production') {
		options.secure = true;
	}

	res.status(statusCode)
		.cookie('token', token, options)
		.json({ success: true, msg, token });
}
