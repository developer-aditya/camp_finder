const express = require('express');
const router = express.Router({ mergeParams: true });
// Controller functions
const {
	getCourses,
	getCourse,
} = require('../controller/courses.controller');

router.route('/').get(getCourses);

router.route('/:id').get(getCourse);

module.exports = router;
