const express = require('express');
const router = express.Router({ mergeParams: true });
// Controller functions
const { getCourses } = require('../controller/courses.controller');

router.route('/').get(getCourses);

module.exports = router;
