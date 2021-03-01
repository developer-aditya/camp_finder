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

// Other Resource Routers
const courseRouter = require('./courses.route');

// Re-routing to other resources
// Re-routing to courses for /bootcamps/:bootcampId/courses
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(addBootcamp);

router
	.route('/:id')
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

router.route('/:id/photo').put(uploadBootcampPhoto);

module.exports = router;
