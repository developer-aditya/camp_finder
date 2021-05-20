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
	const course = await Course.findById(req.params.id).populate({
		path: 'bootcamp',
		select: 'name description',
	});

	if (!course) {
		return next(
			new ErrorResponse(`Course Not Found With ID: ${req.params.id}`, 404),
		);
	}

	res.status(200).json({
		success: true,
		msg: `Course Fetched With ID: ${req.params.id}`,
		data: course,
	});
});

// @desc  POST course to bootcamps for bootcampID
// @route /api/v1/bootcamps/:bootcampsId/courses
// @access private
exports.addCourse = asyncHandler(async (req, res, next) => {
	// Adding bootcamp Id to req body to add that feild in course document
	req.body.bootcamp = req.params.bootcampId;
	req.body.user = req.user._id;

	const bootcamp = await Bootcamp.findById(req.params.bootcampId);

	if (!bootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.bootcampId}`,
				404,
			),
		);
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				`User ID: ${req.user._id} is not authorized to add course in Bootcamp: ${req.params.bootcampId}`,
				401,
			),
		);
	}

	// calls the pre save in model as create internally raises save event: Calculates averageRating
	const course = await Course.create(req.body);

	res.status(200).json({
		success: true,
		msg: `Course Created For Bootcamp: ${req.params.bootcampId}`,
		data: course,
	});
});

// @desc  PUT(UPDATE) course By Id
// @route /api/v1/courses/:id
// @access private
exports.updateCourse = asyncHandler(async (req, res, next) => {
	let course = await Course.findById(req.params.id);

	if (!course) {
		return next(
			new ErrorResponse(`Course Not Found With ID: ${req.params.id}`, 404),
		);
	}

	if (
		course.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				`User: ${req.user._id} is not authorized to update courses in Bootcamp: ${course.bootcamp._id}`,
				401,
			),
		);
	}

	course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	course.save();

	res.status(200).json({
		success: true,
		msg: `Course Updated for ID: ${req.params.id}`,
		data: course,
	});
});

// @desc  DELETE course By Id
// @route /api/v1/courses/:id
// @access private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) {
		return next(
			new ErrorResponse(`Course Not Found With ID: ${req.params.id}`, 404),
		);
	}

	if (
		course.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				`User: ${req.user._id} is not authorized to delete courses in Bootcamp: ${course.bootcamp._id}`,
				401,
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
