// @desc  GET all bootcamps
// @route /api/v1/bootcamps
// @access public
module.exports.getBootcamps = (req, res) => {
	res.status(200).json({ success: true, data: 'Get All bootcamps' });
};

// @desc  GET one bootcamp by id
// @route /api/v1/bootcamps/:id
// @access public
module.exports.getBootcamp = (req, res) => {
	res.status(200).json({
		success: true,
		data: `Get bootcamp of ${req.params.id}`,
	});
};

// @desc  POST one bootcamp
// @route /api/v1/bootcamps
// @access public
module.exports.addBootcamp = (req, res) => {
	res.status(200).json({ success: true, data: req.body });
};

// @desc  PUT(update) one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
module.exports.updateBootcamp = (req, res) => {
	res.status(200).json({
		success: true,
		data: `Update bootcamp of ${req.params.id}`,
	});
};

// @desc  DELETE one bootcamp
// @route /api/v1/bootcamps/:id
// @access public
module.exports.deleteBootcamp = (req, res) => {
	res.status(200).json({
		success: true,
		data: `Delete bootcamp of ${req.params.id}`,
	});
};
