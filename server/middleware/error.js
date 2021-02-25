const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	// Log For Developers
	// console.log(err.stack);
	console.log(err.name);

	// Mongoose Bad ObjectID Error
	if (err.name === 'CastError') {
		const message = `Wrong Formatted MongoDB ID: ${err.value}`;
		error = new ErrorResponse(message, 400);
	}

	//  Mongoose Duplicate Key Error
	if (err.code === 11000) {
		const duplicateKey = Object.keys(err.keyValue);
		const duplicateValue = Object.values(err.keyValue);
		const message = ` { ${duplicateKey} : ${duplicateValue} } Already Exists in Record`;
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message,
	});
};

module.exports = errorHandler;
