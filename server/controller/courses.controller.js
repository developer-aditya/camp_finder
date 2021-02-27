// Bootcamp model to CRUD from DB
const Course = require('../models/courses.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc  GET all courses
// @route /api/v1/courses
// @route /api/v1/bootcamps/:bootcampId/courses
// @access public
exports.getCourses = asyncHandler(async (req, res, next) => {
	let query;

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId }).populate({
			path: 'bootcamp',
			select: 'name description',
		});
	} else {
		query = Course.find().populate({
			path: 'bootcamp',
			select: 'name description',
		});
	}

	const course = await query;

	res.status(200).json({
		success: true,
		count: course.length,
		msg: `Courses Fetched`,
		data: course,
	});
});
