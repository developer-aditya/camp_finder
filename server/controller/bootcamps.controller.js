// Bootcamp model to CRUD from DB
const Bootcamp = require('../models/bootcamps. model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc  GET all bootcamps
// @route /api/v1/bootcamps
// @access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find();
	res.status(200).json({
		success: true,
		count: bootcamps.length,
		msg: 'Successfully Fetched Data',
		data: bootcamps,
	});
});

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (bootcamp === null) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}
	res.status(200).json({
		success: true,
		msg: `Bootcamp Fetched With id: ${req.params.id}`,
		data: bootcamp,
	});
});

// @desc  POST one bootcamp
// @route /api/v1/bootcamps
// @access public
exports.addBootcamp = asyncHandler(async (req, res, next) => {
	const newBootcamp = await Bootcamp.create(req.body);
	res.status(200).json({
		success: true,
		msg: 'Bootcamp added Successfully',
		data: newBootcamp,
	});
});

// @desc  PUT(update) one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.updateBootcamp = async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		},
	);
	if (bootcamp === null) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}
	res.status(200).json({
		success: true,
		msg: 'data updated sucessfully',
		data: bootcamp,
	});
};

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
	if (bootcamp === null) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}
	res.status(200).json({
		success: true,
		msg: 'data deleted sucessfully',
		data: bootcamp,
	});
});
