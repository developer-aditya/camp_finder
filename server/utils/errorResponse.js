// Util toModify Error Class To Add Own Custom Message
class ErrorResponse extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

module.exports = ErrorResponse;
