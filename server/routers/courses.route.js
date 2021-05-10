const express = require('express');
const router = express.Router({ mergeParams: true });
// Controller functions
const {
	getCourses,
	getCourse,
	addCourse,
	updateCourse,
	deleteCourse,
} = require('../controller/courses.controller');
const Course = require('../models/courses.model');
const advanceQueryResult = require('../middleware/advanceQuery');
const { protected, authorized } = require('../middleware/auth');

router
	.route('/')
	.get(
		// advanceQueryResult(Course, {
		// 	path: 'bootcamp',
		// 	select: 'name description',
		// }),
		getCourses,
	)
	.post(protected, authorized('admin', 'publisher'), addCourse);

router
	.route('/:id')
	.get(getCourse)
	.put(protected, authorized('admin', 'publisher'), updateCourse)
	.delete(protected, authorized('admin', 'publisher'), deleteCourse);

module.exports = router;
