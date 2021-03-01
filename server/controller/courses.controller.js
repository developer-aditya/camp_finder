// Bootcamp model to CRUD from DB
const Course = require('../models/courses.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/bootcamps. model');

// @desc  GET all courses
// @route /api/v1/courses
// @route /api/v1/bootcamps/:bootcampId/courses
// @access public
exports.getCourses = asyncHandler(async (req, res, next) => {
	if (req.params.bootcampId) {
		let bootcamp = await Bootcamp.findById(req.params.bootcampId);
		if (!bootcamp) {
			return next(
				new ErrorResponse(
					`Bootcamp Not Found with ID: ${req.params.bootcampId}`,
					404,
				),
			);
		}
		let course = await Course.find({
			bootcamp: req.params.bootcampId,
		}).populate({
			path: 'bootcamp',
			select: 'name description',
		});
		return res.status(200).json({
			success: true,
			count: course.length,
			msg: `Sucessfully fetched courses of bootcamp: ${req.params.bootcampId}`,
			data: course,
		});
	} else {
		res.status(200).json(res.resource);
	}
});

// @desc  GET one courses by ID
// @route /api/v1/courses/:id
// @access public
exports.getCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);

	if (!course) {
		return next(
			new ErrorResponse(
				`Course Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}

	res.status(200).json({
		success: true,
		msg: `Course Fetched With ID: ${req.params.id}`,
		data: course,
	});
});

// @desc  ADD course to bootcamps for bootcampID
// @route /api/v1/bootcamps/:bootcampsId/courses
// @access public
exports.addCourse = asyncHandler(async (req, res, next) => {
	// Adding bootcamp Id to req body to add that feild in course document
	req.body.bootcamp = req.params.bootcampId;

	const bootcamp = await Bootcamp.findById(req.params.bootcampId);

	if (!bootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.bootcampId}`,
				404,
			),
		);
	}

	const course = await Course.create(req.body);

	res.status(200).json({
		success: true,
		msg: `Course Created For Bootcamp: ${req.params.bootcampId}`,
		data: course,
	});
});

// @desc  PUT(UPDATE) course By Id
// @route /api/v1/courses/:id
// @access public
exports.updateCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!course) {
		return next(
			new ErrorResponse(
				`Course Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}

	res.status(200).json({
		success: true,
		msg: `Course Updated for ID: ${req.params.id}`,
		data: course,
	});
});

// @desc  DELETE course By Id
// @route /api/v1/courses/:id
// @access public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) {
		return next(
			new ErrorResponse(
				`Course Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}
	course.remove();
	res.status(200).json({
		success: true,
		msg: `Course Delete for ID: ${req.params.id}`,
		data: course,
	});
});
