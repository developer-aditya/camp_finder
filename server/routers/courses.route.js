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
const { protected } = require('../middleware/auth');

router
	.route('/')
	.get(advanceQueryResult(Course, 'bootcamp'), getCourses)
	.post(protected, addCourse);

router
	.route('/:id')
	.get(getCourse)
	.put(protected, updateCourse)
	.delete(protected, deleteCourse);

module.exports = router;
