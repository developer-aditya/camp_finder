// Bootcamp model to CRUD from DB
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc  GET all users with query
// @route /api/v1/users
// @access private Admin Use
exports.getUsers = asyncHandler(async (req, res, next) => {
	// RESPONSE
	res.status(200).json(res.resource);
});

// @desc  GET all users with user ID
// @route /api/v1/users/:id
// @access private Admin Use
exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorResponse(`User Not Found With ID: ${req.params.id}`, 404),
		);
	}
	res.status(200).json({
		success: true,
		msg: `User Fetched With id: ${req.params.id}`,
		data: user,
	});
});

// @desc  POST one users
// @route /api/v1/users
// @access private Admin Use
exports.addUser = asyncHandler(async (req, res, next) => {
	const { name, email, role, password } = req.body;
	let user = await User.create({ name, email, role, password });

	res.status(200).json({
		success: true,
		msg: 'User added Successfully...',
	});
});

// @desc  PUT(update) one Users
// @route /api/v1/users/:id
// @access private Admin Use
exports.updateUser = asyncHandler(async (req, res, next) => {
	const { name, email, role, password } = req.body;
	let user = await User.findByIdAndUpdate(
		req.params.id,
		{ name, email, role },
		{
			new: true,
			runValidators: true,
		},
	).select('+password');

	if (!user) {
		return next(
			new ErrorResponse(`User Not Found With ID: ${req.params.id}`, 404),
		);
	}

	user.password = password;
	user.save();

	res.status(200).json({
		success: true,
		msg: 'Users updated sucessfully...',
		data: user,
	});
});

// @desc  DELETE one user
// @route /api/v1/users/:id
// @access private Admin Use
exports.deleteUser = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) {
		return next(
			new ErrorResponse(`User Not Found With ID: ${req.params.id}`, 404),
		);
	}

	res.status(200).json({
		success: true,
		msg: 'User deleted sucessfully...',
		data: user,
	});
});
