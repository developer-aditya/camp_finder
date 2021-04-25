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

// Static function are called on model directly and not on response from query run on model
// methods are functions that are called on response from query run on model
// find(), findByID(), create() are all predefined static function
// getAverageCost() is a custom static function
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
	const Obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageRating: { $avg: '$rating' },
			},
		},
	]);

	if (Obj.length !== 0) {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageRating: Math.ceil(Obj[0].averageRating),
		});
	} else {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageRating: null,
		});
	}
};

// Calculating average review after saving a document
ReviewSchema.post('save', function () {
	this.model('Review').getAverageRating(this.bootcamp);
});

// Calculating average review after removing a document
ReviewSchema.pre('remove', function () {
	this.model('Review').getAverageRating(this.bootcamp);
});

// restrict a user to add review to a particular bootcamp twice
// creating a index using two feilds bootcamp and user and make it unique
// Indexing helps to serach faster by hashing that feild otherwise searching is done linearly
// below code will create new index with bootcamp user values combined and that would be unique
// By default _id feild is indexed and made unique
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

module.exports = Mongoose.model('Review', ReviewSchema, 'reviewsColl');
