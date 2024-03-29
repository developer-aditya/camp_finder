// Bootcamp model to CRUD from DB
const Review = require('../models/reviews.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/bootcamps. model');

// @desc  GET all reviews
// @route /api/v1/reviews
// @route /api/v1/bootcamps/:bootcampId/reviews
// @access public
exports.getReviews = asyncHandler(async (req, res, next) => {
	if (req.params.bootcampId) {
		let bootcamp = await Bootcamp.findById(req.params.bootcampId);
		if (!bootcamp) {
			return next(new ErrorResponse('Bootcamp Not Found', 404));
		}

		let review = await Review.find({
			bootcamp: req.params.bootcampId,
		}).populate({
			path: 'user',
			select: 'name role',
		});

		return res.status(200).json({
			success: true,
			count: review.length,
			msg: 'Sucessfully fetched reviews of bootcamp',
			data: review,
		});
	} else {
		res.status(200).json(res.resource);
	}
});

// @desc  GET one reviews by ID
// @route /api/v1/reviews/:id
// @access public
exports.getReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id).populate({
		path: 'bootcamp',
		select: 'name',
	});

	if (!review) {
		return next(new ErrorResponse('Review Not Found', 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Review Fetched',
		data: review,
	});
});

// @desc  GET Logged in user bootcamp
// @route /api/v1/reviews/me
// @access private
exports.getUserReview = asyncHandler(async (req, res, next) => {
	const review = await Review.find({ user: req.user.id }).populate(
		'bootcamp',
		'name',
	);

	if (!review) {
		return next(new ErrorResponse('Reviews Not Found for User', 404));
	}
	res.status(200).json({
		success: true,
		msg: 'Review Fetched For User',
		data: review,
	});
});

// @desc  POST Review
// @route /api/v1/bootcamps/:bootcampId/reviews
// @access private
exports.addReview = asyncHandler(async (req, res, next) => {
	// Adding bootcamp Id to req body to add that feild in review document
	req.body.bootcamp = req.params.bootcampId;
	req.body.user = req.user._id;

	const bootcamp = await Bootcamp.findById(req.params.bootcampId);

	if (!bootcamp) {
		return next(new ErrorResponse('Bootcamp Not Found', 404));
	}

	// calls the pre save in model as create internally raises save event: Calculates averageRating
	const review = await Review.create(req.body);

	res.status(200).json({
		success: true,
		msg: 'Review Created For This Bootcamp',
		data: review,
	});
});

// @desc  PUT one reviews by ID
// @route /api/v1/reviews/:id
// @access private
exports.updateReview = asyncHandler(async (req, res, next) => {
	let review = await Review.findById(req.params.id);

	if (!review) {
		return next(new ErrorResponse('Review Not Found', 404));
	}

	if (
		review.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'Unathorized User can update his own Reviews Only',
				401,
			),
		);
	}

	for (let elem in req.body) review[elem] = req.body[elem];
	await review.save();
	review = await Review.findById(req.params.id).populate('bootcamp', 'name');

	res.status(200).json({
		success: true,
		msg: 'Review Updated...',
		data: review,
	});
});

// @desc  DELETE one reviews by ID
// @route /api/v1/reviews/:id
// @access private
exports.deleteReview = asyncHandler(async (req, res, next) => {
	let review = await Review.findById(req.params.id);

	if (!review) {
		return next(new ErrorResponse('Review Not Found', 404));
	}

	if (
		review.user.toString() !== req.user._id.toString() &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(
				'Unathorized User can delete his own Reviews Only',
				401,
			),
		);
	}

	await review.remove();
	res.status(200).json({
		success: true,
		msg: 'Review Deleted...',
		data: review,
	});
});
