const geocoder = require('../utils/geocoder');

const advanceQueryResult = (model, populate) => async (req, res, next) => {
	let query;
	let reqQuery = { ...req.query };

	// feild in query string not to be included in reqQuery
	const removeFeild = ['select', 'sort', 'limit', 'page'];
	removeFeild.map((feild) => delete reqQuery[feild]);

	// Identifying and converting field to mongoDB operators
	let queryStr = JSON.stringify(reqQuery);
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`,
	);
	reqQuery = JSON.parse(queryStr);

	// Converting true false string values to Boolean
	let feilds = Object.keys(reqQuery);
	feilds.forEach((element) => {
		if (reqQuery[element] === 'true') reqQuery[element] = true;
		else if (reqQuery[element] === 'false') reqQuery[element] = false;
	});

	// If request made by /:zipcode/:radius route -- adding location feild to query
	if (JSON.stringify(req.params) !== '{}') {
		const { zipcode, distance } = req.params;
		const radius = distance / 3958.8;
		// Point of zipcode
		const loc = await geocoder.geocode(zipcode);
		reqQuery = {
			...reqQuery,
			location: {
				$geoWithin: {
					$centerSphere: [[loc[0].longitude, loc[0].latitude], radius],
				},
			},
		};
	}

	// FINDING RESOURCE
	query = model.find(reqQuery);

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
	const lim = parseInt(req.query.limit, 10) || 4;
	const lowerLim = (page - 1) * lim;
	const upperLim = page * lim;
	const total = await model.countDocuments();
	let pagination = {};

	if (lowerLim > 0) {
		pagination.prev = { page: page - 1, limit: lim };
	}
	if (upperLim < total) {
		pagination.next = { page: page + 1, limit: lim };
	}

	query = query.skip(lowerLim).limit(upperLim);

	if (populate) {
		query = query.populate(populate);
	}

	// EXECUTING QUERY
	const resource = await query;

	res.resource = {
		success: true,
		count: resource.length,
		pagination,
		msg: 'Successfully Fetched Resource',
		data: resource,
	};
	next();
};

module.exports = advanceQueryResult;
