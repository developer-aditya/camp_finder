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

router.route('/').get(getCourses).post(addCourse);

router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
