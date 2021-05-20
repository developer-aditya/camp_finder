// Replace try catch with wrapper function to catch any error inside and send to next() error handling middleware

const asyncHandler = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
