// Bootcamp model to CRUD from DB
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/courses.model');
const Bootcamp = require('../models/bootcamps. model');
const Enroll = require('../models/enrolls.model');

// @desc  GET all courses
// @route /api/v1/courses
// @route /api/v1/bootcamps/:bootcampId/courses
// @access public
exports.getCourses = asyncHandler(async (req, res, next) => {
	if (req.params.bootcampId) {
		let bootcamp = await Bootcamp.findById(req.params.bootcampId);
		if (!bootcamp) {
			return next(new ErrorResponse('Bootcamp Not Found', 404));
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
			msg: 'Sucessfully fetched courses of bootcamp',
			data: course,
		});
	} else {
		res.status(200).json(res.resource);
	}
});

// @desc  GET enrolled courses of user
// @route /api/v1/courses/enrolled
// @access private
exports.getEnrolledCourses = asyncHandler(async (req, res, next) => {
	let course = await Enroll.find({
		user: req.user.id,
	}).populate({ path: 'course', select: 'title tuition' });

	return res.status(200).json({
		success: true,
		count: course.length,
		msg: 'Sucessfully fetched courses of User',
		data: course,
	});
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
		return next(new ErrorResponse('Course Not Found', 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Course Fetched',
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
		return next(new ErrorResponse('Bootcamp Not Found', 404));
	}

	if (
		bootcamp.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'Useris not authorized to add course in this Bootcamp',
				401,
			),
		);
	}

	// calls the pre save in model as create internally raises save event: Calculates averageRating
	const course = await Course.create(req.body);

	res.status(200).json({
		success: true,
		msg: 'Course Created For Bootcamp',
		data: course,
	});
});

// @desc  PUT(UPDATE) course By Id
// @route /api/v1/courses/:id
// @access private
exports.updateCourse = asyncHandler(async (req, res, next) => {
	let course = await Course.findById(req.params.id);

	if (!course) {
		return next(new ErrorResponse('Course Not Found', 404));
	}

	if (
		course.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'User is not authorized to update courses in this Bootcamp',
				401,
			),
		);
	}

	for (let elem in req.body) course[elem] = req.body[elem];
	await course.save();
	course = await Course.findById(req.params.id);

	res.status(200).json({
		success: true,
		msg: 'Course Updated',
		data: course,
	});
});

// @desc  DELETE course By Id
// @route /api/v1/courses/:id
// @access private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) {
		return next(new ErrorResponse('Course Not Found', 404));
	}

	if (
		course.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'User is not authorized to delete courses in Bootcamp',
				401,
			),
		);
	}

	await course.remove();
	res.status(200).json({
		success: true,
		msg: 'Course Delete',
		data: course,
	});
});
