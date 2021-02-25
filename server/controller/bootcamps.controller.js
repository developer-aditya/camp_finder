// Bootcamp model to CRUD from DB
const Bootcamp = require('../models/bootcamps. model');

// @desc  GET all bootcamps
// @route /api/v1/bootcamps
// @access public
exports.getBootcamps = async (req, res, next) => {
	try {
		const bootcamps = await Bootcamp.find();
		if (bootcamps === null) {
			return res
				.status(404)
				.json({ success: false, count: 0, msg: 'Bootcamp Not Found' });
		}
		res.status(200).json({
			success: true,
			count: bootcamps.length,
			msg: 'Successfully Fetched Data',
			data: bootcamps,
		});
	} catch (err) {
		next(err);
	}
};

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);
		if (bootcamp === null) {
			return res.status(404).json({
				success: false,
				msg: `Bootcamp Not Found With ID: ${req.params.id}`,
			});
		}
		res.status(200).json({
			success: true,
			msg: `Bootcamp Fetched With id: ${req.params.id}`,
			data: bootcamp,
		});
	} catch (err) {
		next(err);
	}
};

// @desc  POST one bootcamp
// @route /api/v1/bootcamps
// @access public
exports.addBootcamp = async (req, res, next) => {
	try {
		const newBootcamp = await Bootcamp.create(req.body);
		res.status(200).json({
			success: true,
			msg: 'Bootcamp added Successfully',
			data: newBootcamp,
		});
	} catch (err) {
		next(err);
	}
};

// @desc  PUT(update) one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.updateBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			},
		);
		if (bootcamp === null) {
			return res.status(404).json({
				success: false,
				msg: `Bootcamp Not Found With ID: ${req.params.id}`,
			});
		}
		res.status(200).json({
			success: true,
			msg: 'data updated sucessfully',
			data: bootcamp,
		});
	} catch (err) {
		next(err);
	}
};

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.deleteBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
		if (bootcamp === null) {
			return res.status(404).json({
				success: false,
				msg: `Bootcamp Not Found With ID: ${req.params.id}`,
			});
		}
		res.status(200).json({
			success: true,
			msg: 'data deleted sucessfully',
			data: bootcamp,
		});
	} catch (err) {
		next(err);
	}
};
