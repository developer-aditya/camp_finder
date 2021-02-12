const express = require('express');
const router = express.Router();
// Controller functions
const {
	getBootcamps,
	getBootcamp,
	addBootcamp,
	updateBootcamp,
	deleteBootcamp,
} = require('../controller/bootcamps.controller');

router.route('/').get(getBootcamps).post(addBootcamp);

router
	.route('/:id')
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

module.exports = router;
