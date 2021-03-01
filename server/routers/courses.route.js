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

router
	.route('/')
	.get(advanceQueryResult(Course, 'bootcamp'), getCourses)
	.post(addCourse);

router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
