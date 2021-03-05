const express = require('express');
const router = express.Router();
// Controller functions
const {
	getBootcamps,
	getBootcamp,
	getBootcampsInRadius,
	addBootcamp,
	updateBootcamp,
	deleteBootcamp,
	uploadBootcampPhoto,
} = require('../controller/bootcamps.controller');
const Bootcamp = require('../models/bootcamps. model');
const advanceQueryResult = require('../middleware/advanceQuery');
const { protected, authorized } = require('../middleware/auth');

// Other Resource Routers
const courseRouter = require('./courses.route');

// Re-routing to other resources
// Re-routing to courses for /bootcamps/:bootcampId/courses
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
	.route('/')
	.get(advanceQueryResult(Bootcamp, 'course'), getBootcamps)
	.post(protected, authorized('publisher', 'admin'), addBootcamp);

router
	.route('/:id')
	.get(getBootcamp)
	.put(protected, authorized('publisher', 'admin'), updateBootcamp)
	.delete(protected, authorized('publisher', 'admin'), deleteBootcamp);

router
	.route('/:id/photo')
	.put(protected, authorized('publisher', 'admin'), uploadBootcampPhoto);

module.exports = router;
