const colors = require('colors');
const Mongoose = require('mongoose');

const ReviewSchema = new Mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add a Review title'],
		maxlength: 50,
	},
	text: {
		type: String,
		required: [true, 'Please Add Review Details'],
	},
	rating: {
		type: Number,
		min: 0,
		max: 10,
		required: [true, 'Please Add Review Rating Between 0 to 10'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	bootcamp: {
		type: Mongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true,
	},
	user: {
		type: Mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

// restrict a user to add review to a particular bootcamp once
// creating a index(primary key) using two feilds bootcamp and user
// Both combined must be unique
// this is called Composite Key
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

module.exports = Mongoose.model('Review', ReviewSchema, 'reviewsColl');
