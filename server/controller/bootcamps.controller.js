// Bootcamp model to CRUD from DB
const Bootcamp = require('../models/bootcamps. model');

// @desc  GET all bootcamps
// @route /api/v1/bootcamps
// @access public
exports.getBootcamps = (req, res, next) => {
	res.status(200).json({ success: true, data: 'Get All bootcamps' });
};

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: `Get bootcamp of ${req.params.id}`,
	});
};

// @desc  POST one bootcamp
// @route /api/v1/bootcamps
// @access public
exports.addBootcamp = async (req, res, next) => {
	const newBootcamp = await Bootcamp.create(req.body);
	res.status(200).json({ success: true, data: newBootcamp });
};

// @desc  PUT(update) one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.updateBootcamp = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: `Update bootcamp of ${req.params.id}`,
	});
};

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.deleteBootcamp = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: `Delete bootcamp of ${req.params.id}`,
	});
};
