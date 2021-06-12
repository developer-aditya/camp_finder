const Mongoose = require('mongoose');

const EnrollSchema = new Mongoose.Schema({
	orderId: {
		type: String,
		required: true,
	},
	paymentId: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: Mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	course: {
		type: Mongoose.Schema.ObjectId,
		ref: 'Course',
		required: true,
	},
	bootcamp: {
		type: Mongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true,
	},
});

EnrollSchema.index({ course: 1, user: 1 }, { unique: true });
module.exports = Mongoose.model('Enroll', EnrollSchema, 'enrollsColl');
