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
	let msg;

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId });
		msg = `Sucessfully fetched Courses of Bootcamps :${req.params.bootcampId}`;
	} else {
		query = Course.find().populate({
			path: 'bootcamp',
			select: 'name description',
		});
		msg = `Sucessfully fetched Courses `;
	}

	const course = await query;

	res.status(200).json({
		success: true,
		count: course.length,
		msg,
		data: course,
	});
});

// @desc  GET one courses by ID
// @route /api/v1/courses/:id
// @access public
exports.getCourse = asyncHandler(async (req, res, next) => {
	let query = Course.find({ _id: req.params.id }).populate({
		path: 'bootcamp',
		select: 'name description',
	});

	const course = await query;

	res.status(200).json({
		success: true,
		msg: `Bootcamp Fetched With id: ${req.params.id}`,
		data: course,
	});
});
