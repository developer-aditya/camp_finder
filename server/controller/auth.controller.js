const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/mailer');
const crypto = require('crypto');

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

// @desc POST user email for Forget Password Token to be sent to that email
// @route /api/v1/auth/forgotpassword
// @access public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(
			new ErrorResponse(`User with email provided Not found `, 404),
		);
	}
	const resetToken = user.resetPasswordTokenGenerator();

	// saving resetPasswordToken, resetPasswordTokenExpire assigned in above functionto generate token in DB
	await user.save({ validateBeforeSave: true });

	const resetRoute = `${req.protocol}://${req.get(
		'host',
	)}/api/v1/auth/resetpassword/${resetToken}`;

	const message = `You have Recieved this email because you (or someone else) has requested reset password.\nPlease send a put request on the route to reset Password:\n\n ${resetRoute}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Reset Your Forgot Password...',
			message,
		});
		res.status(200).json({
			success: true,
			msg: message,
		});
	} catch (err) {
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpire = undefined;

		await user.save({ validateBeforeSave: true });
		return next(
			new ErrorResponse(
				'Server Error: Unable to sent reset password link',
				500,
			),
		);
	}
});

// @desc PUT request to reset password with link sent to email
// @route /api/v1/auth/resetpassword/:resetPasswordToken
// @access public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	const hashedResetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resetPasswordToken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken: hashedResetPasswordToken,
		resetPasswordTokenExpire: { $gt: Date.now() },
	}).select('+password');

	if (!user) {
		return next(
			new ErrorResponse(
				`oops! Token Has expired please try forgot Password Again `,
				400,
			),
		);
	}

	const samePassword = await user.validatePassword(req.body.password);
	if (samePassword) {
		return next(
			new ErrorResponse(
				`New Password Cannot same as Last 5 Password `,
				400,
			),
		);
	}

	user.password = req.body.password;
	await user.save({ validateBeforeSave: true });
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save({ validateBeforeSave: true });

	setTokenInCookie(
		user,
		res,
		200,
		'Password Changed Successfully : User Logged In',
	);
});

//
//
//
//
//
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