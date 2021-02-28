// Bootcamp model to CRUD from DB
const Bootcamp = require('../models/bootcamps. model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc  GET all bootcamps with query
// @route /api/v1/bootcamps
// @access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	let query;
	let reqQuery = { ...req.query };

	// feild in query string not to be included in reqQuery
	const removeFeild = ['select', 'sort', 'limit', 'page'];
	// Loop through remove field and delete from reqQuery
	removeFeild.map((feild) => delete reqQuery[feild]);

	let queryStr = JSON.stringify(reqQuery);
	// Identifying and converting field to mongoDB operators
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`,
	);
	reqQuery = JSON.parse(queryStr);

	// FINDING RESOURCE
	query = Bootcamp.find(reqQuery);

	// 1. Handling select in query String
	if (req.query.select) {
		const selectQuery = req.query.select.split(',').join(' ');
		query = query.select(selectQuery);
	}

	// 2. Handling sort in query String
	if (req.query.sort) {
		const sortQuery = req.query.sort.split(',').join(' ');
		query = query.sort(sortQuery);
	} else {
		query = query.sort('-createdAt');
	}

	const page = parseInt(req.query.page, 10) || 1;
	const lim = parseInt(req.query.limit, 10) || 10;
	const lowerLim = (page - 1) * lim;
	const upperLim = page * lim;
	const total = await Bootcamp.countDocuments();
	let pagination = {};

	if (lowerLim > 0) {
		pagination.prev = { page: page - 1, limit: lim };
	}
	if (upperLim < total) {
		pagination.next = { page: page + 1, limit: lim };
	}

	query = query.skip(lowerLim).limit(upperLim);

	// EXECUTING QUERY
	const bootcamps = await query.populate({
		path: 'courses',
		select: 'title weeks tuitions',
	});

	// RESPONSE
	res.status(200).json({
		success: true,
		count: bootcamps.length,
		pagination,
		msg: 'Successfully Fetched Bootcamps',
		data: bootcamps,
	});
});

// @desc  GET all bootcamps within a radius
// @route /api/v1/bootcamps/radius/:zipcode/:distance
// @access public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params;
	const radius = distance / 3958.8;
	// Point of zipcode
	const loc = await geocoder.geocode(zipcode);

	const bootcamp = await Bootcamp.find({
		location: {
			$geoWithin: {
				$centerSphere: [[loc[0].longitude, loc[0].latitude], radius],
			},
		},
	});

	res.status(200).json({
		success: true,
		msg: `${bootcamp.length} Bootcamps Fetched Within ${distance}`,
		data: bootcamp,
	});
});

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id).populate({
		path: 'courses',
		select: 'title weeks tuitions',
	});
	if (!bootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}
	res.status(200).json({
		success: true,
		msg: `Bootcamp Fetched With id: ${req.params.id}`,
		data: bootcamp,
	});
});

// @desc  POST one bootcamp
// @route /api/v1/bootcamps
// @access public
exports.addBootcamp = asyncHandler(async (req, res, next) => {
	const newBootcamp = await Bootcamp.create(req.body);
	res.status(200).json({
		success: true,
		msg: 'Bootcamp added Successfully',
		data: newBootcamp,
	});
});

// @desc  PUT(update) one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.updateBootcamp = async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		},
	);
	if (!bootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}
	res.status(200).json({
		success: true,
		msg: 'Bootcamp updated sucessfully',
		data: bootcamp,
	});
};

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrorResponse(
				`Bootcamp Not Found With ID: ${req.params.id}`,
				404,
			),
		);
	}
	bootcamp.remove();
	res.status(200).json({
		success: true,
		msg: 'data deleted sucessfully',
		data: bootcamp,
	});
});
