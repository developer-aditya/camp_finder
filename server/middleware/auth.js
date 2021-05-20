const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');

// To check if token exist and user of id in token exists in User Collection
exports.protected = asyncHandler(async (req, res, next) => {
	let token;

	// // auth using bearer token
	// if (
	// 	req.headers.authorization &&
	// 	req.headers.authorization.startsWith('Bearer')
	// ) {
	// 	// set token from bearer token
	// 	token = req.headers.authorization.split(' ')[1];
	// }

	// auth using cookies sent in every request
	if (req.cookies.token) {
		// set token from token in cookies
		token = req.cookies.token;
	}

	if (!token) {
		return next(
			new ErrorResponse(
				'uh-oh! User Not Authorized to access this route',
				401,
			),
		);
	}

	// to catch jwt error and modify it
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(payload.id);
		next();
	} catch (err) {
		return next(
			new ErrorResponse('User Not Authorized to access this route', 401),
		);
	}
});

// To check weather user role is authorized to access Route hit
exports.authorized = (...roles) => {
	return asyncHandler(async (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorResponse(
					`${req.user.role} Not Authorized to access this route`,
					401,
				),
			);
		}
		next();
	});
};
