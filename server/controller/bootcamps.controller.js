// Bootcamp model to CRUD from DB
const Bootcamp = require('../models/bootcamps. model');

// @desc  GET all bootcamps
// @route /api/v1/bootcamps
// @access public
exports.getBootcamps = async (req, res, next) => {
	try {
		const bootcamps = await Bootcamp.find();
		if (bootcamps.length === 0) {
			return res
				.status(404)
				.json({ success: true, count: 0, msg: 'No Bootcamps Found' });
		}
		res.status(200).json({
			success: true,
			count: bootcamps.length,
			msg: 'Successfully Fetched Data',
			data: bootcamps,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			msg: `${err}`,
		});
	}
};

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);
		if (bootcamp.length === 0) {
			return res.status(404).json({
				success: true,
				msg: `No Bootcamps With Id ${req.param.id}`,
			});
		}
		res.status(200).json({
			success: true,
			msg: `Bootcamp Fetched With id: ${req.params.id}`,
			data: bootcamp,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			msg: `${err}`,
		});
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
		res.status(400).json({
			success: false,
			msg: `${err}`,
		});
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
		);
		if (bootcamp === null) {
			return res.status(404).json({
				success: true,
				msg: `Cannot find Bootcamp with id: ${req.params.id}`,
			});
		}
		res.status(200).json({
			success: true,
			msg: 'data updated sucessfully',
			data: bootcamp,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			msg: `${err}`,
		});
	}
};

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
exports.deleteBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
		if (bootcamp === null) {
			return res.status(404).json({
				success: true,
				msg: `Cannot find Bootcamp with id: ${req.params.id}`,
			});
		}
		res.status(200).json({
			success: true,
			msg: 'data deleted sucessfully',
			data: bootcamp,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			msg: `${err}`,
		});
	}
};
