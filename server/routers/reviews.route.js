const express = require('express');
const router = express.Router({ mergeParams: true });
// Controller functions
const {
	getReviews,
	getReview,
	addReview,
} = require('../controller/reviews.controller');
const Review = require('../models/reviews.model');
const advanceQueryResult = require('../middleware/advanceQuery');
const { protected, authorized } = require('../middleware/auth');

router
	.route('/')
	.get(
		advanceQueryResult(Review, {
			path: 'user',
			select: 'name role',
		}),
		getReviews,
	)
	.post(protected, authorized('user', 'admin'), addReview);

router.route('/:id').get(getReview);

module.exports = router;
