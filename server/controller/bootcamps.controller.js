// Bootcamp model to CRUD from DB
const Bootcamp = require('../models/bootcamps. model');
const Enroll = require('../models/enrolls.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');

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

// @desc  GET users enrolled in Bootcamp
// @route /api/v1/bootcamps/enrolled
// @access private
exports.getEnrolledUser = asyncHandler(async (req, res, next) => {
	const boot = await Bootcamp.findOne({ user: req.user.id });
	if (!boot) {
		return next(new ErrorResponse('Bootcamp Not Found for User', 404));
	}

	let course = await Enroll.find({
		bootcamp: boot._id,
	})
		.populate({ path: 'user', select: 'name email' })
		.populate({ path: 'course', select: 'title tuition' });

	return res.status(200).json({
		success: true,
		count: course.length,
		msg: `Sucessfully fetched Enrolled Users`,
		data: course,
	});
});

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(new ErrorResponse('Bootcamp Not Found', 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Bootcamp Fetched ',
		data: bootcamp,
	});
});

// @desc  GET Logged in user bootcamp
// @route /api/v1/bootcamps/me
// @access private
exports.getUserBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findOne({ user: req.user.id });
	if (!bootcamp) {
		return next(new ErrorResponse('Bootcamp Not Found for User', 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Bootcamp Fetched For User',
		data: bootcamp,
	});
});

// @desc  POST one bootcamp
// @route /api/v1/bootcamps
// @access private
exports.addBootcamp = asyncHandler(async (req, res, next) => {
	let published = await Bootcamp.findOne({ user: req.user._id });

	if (published && req.user.role !== 'admin') {
		return next(new ErrorResponse('Publisher Already has a Bootcamp', 400));
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
// @access private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
	let bootcamp = await Bootcamp.findById(req.params.id);

	if (!bootcamp) {
		return next(new ErrorResponse('Bootcamp Not Found', 404));
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'User is not authorized to access this Bootcamp',
				401,
			),
		);
	}

	for (let elem in req.body) bootcamp[elem] = req.body[elem];
	await bootcamp.save();
	bootcamp = await Bootcamp.findById(req.params.id);

	res.status(200).json({
		success: true,
		msg: 'Bootcamp updated sucessfully',
		data: bootcamp,
	});
});

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(new ErrorResponse('Bootcamp Not Found', 404));
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'User is not authorized to access this Bootcamp',
				401,
			),
		);
	}

	// Deleting image of that bootcamp from file system
	if (bootcamp.photo !== 'no-photo.jpg') {
		try {
			fs.unlinkSync(
				path.resolve(
					process.cwd(),
					'server',
					'public',
					'uploads',
					`${bootcamp.photo}`,
				),
			);
		} catch (error) {
			return next(
				new ErrorResponse(
					`Unable to remove bootcamp image try again!`,
					500,
				),
			);
		}
	}

	await bootcamp.remove();
	res.status(200).json({
		success: true,
		msg: 'Bootcamp deleted sucessfully',
		data: bootcamp,
	});
});

// @desc  PUT(update) bootcamp with photo
// @route /api/v1/bootcamps/:id/photo
// @access private
exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
	let bootcamp = await Bootcamp.findById(req.params.id);

	if (!bootcamp) {
		return next(new ErrorResponse('Bootcamp Not Found', 404));
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'User is not authorized to access this Bootcamp',
				401,
			),
		);
	}

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = req.files.image;

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
