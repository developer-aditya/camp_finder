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
const protect = require('../middleware/auth');

router
	.route('/')
	.get(advanceQueryResult(Course, 'bootcamp'), getCourses)
	.post(protect, addCourse);

router
	.route('/:id')
	.get(getCourse)
	.put(protect, updateCourse)
	.delete(protect, deleteCourse);

module.exports = router;
