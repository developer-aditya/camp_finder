// Bootcamp model to CRUD from DB
const Bootcamp = require('../models/bootcamps. model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');

// @desc  GET all bootcamps with query
// @route /api/v1/bootcamps
// @access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	// RESPONSE
	res.status(200).json(res.resource);
});

// @desc  GET all bootcamps within a radius
// @route /api/v1/bootcamps/radius/:zipcode/:distance
// @access public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
	// RESOURCE
	res.status(200).json(res.resource);
});

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrorResponse(`Bootcamp Not Found With ID: ${req.params.id}`, 404),
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
	let published = await Bootcamp.findOne({ user: req.user._id });

	if (published && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`Publisher User: ${req.user._id} Already has a Bootcamp`,
				404,
			),
		);
	}

	req.body.user = req.user._id;
	published = await Bootcamp.create(req.body);
	res.status(200).json({
		success: true,
		msg: 'Bootcamp added Successfully',
		data: published,
	});
});

// @desc  PUT(update) one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
	let bootcamp = await Bootcamp.findById(req.params.id);

	if (!bootcamp) {
		return next(
			new ErrorResponse(`Bootcamp Not Found With ID: ${req.params.id}`, 404),
		);
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				`User ID: ${req.user._id} is not authorized to access Bootcamp ID: ${req.params.id}`,
				404,
			),
		);
	}

	bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		msg: 'Bootcamp updated sucessfully',
		data: bootcamp,
	});
});

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrorResponse(`Bootcamp Not Found With ID: ${req.params.id}`, 404),
		);
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				`User ID: ${req.user._id} is not authorized to access Bootcamp ID: ${req.params.id}`,
				404,
			),
		);
	}

	bootcamp.remove();
	res.status(200).json({
		success: true,
		msg: 'Bootcamp deleted sucessfully',
		data: bootcamp,
	});
});

// @desc  PUT(update) bootcamp with photo
// @route /api/v1/bootcamps/:id/photo
// @access public
exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
	let bootcamp = await Bootcamp.findById(req.params.id);

	if (!bootcamp) {
		return next(
			new ErrorResponse(`Bootcamp Not Found With ID: ${req.params.id}`, 404),
		);
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				`User ID: ${req.user._id} is not authorized to access Bootcamp ID: ${req.params.id}`,
				404,
			),
		);
	}

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = req.files.file;

	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload a image file`, 400));
	}

	if (file.size > process.env.UPLOAD_MAX_SIZE) {
		return next(
			new ErrorResponse(
				`Please upload a file with size < ${process.env.UPLOAD_MAX_SIZE}`,
				400,
			),
		);
	}

	file.name = `photo_${req.params.id}${path.extname(file.name)}`;

	file.mv(`${process.env.UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.log(err);
			return next(new ErrorResponse(`Problem in Uploading File `, 500));
		}

		bootcamp = await Bootcamp.findByIdAndUpdate(
			req.params.id,
			{
				photo: file.name,
			},
			{
				new: true,
				runValidators: true,
			},
		);

		res.status(200).json({
			success: true,
			msg: 'Bootcamp Photo updated sucessfully',
			data: bootcamp,
		});
	});
});
