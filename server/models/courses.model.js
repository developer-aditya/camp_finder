// MongoDB vs RelationalDB
// Database -- Database
// Collection -- Tables
// Documents -- record/rows/tuple
// Feilds -- column/attribute
const Mongoose = require('mongoose');

const CourseSchema = new Mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add a course title'],
	},
	description: {
		type: String,
		required: [true, 'Please add a description'],
	},
	weeks: {
		type: String,
		required: [true, 'Please add number of weeks'],
	},
	tuition: {
		type: Number,
		required: [true, 'Please add a tuition cost'],
	},
	minimumSkill: {
		type: String,
		required: [true, 'Please add a minimum skill'],
		enum: ['beginner', 'intermediate', 'advanced'],
	},
	scholarshipsAvailable: {
		type: Boolean,
		default: false,
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
CourseSchema.statics.getAverageCost = async function (bootcampId) {
	const Obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageCost: { $avg: '$tuition' },
			},
		},
	]);

	if (Obj.length !== 0) {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageCost: Math.ceil(Obj[0].averageCost),
		});
	} else {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageCost: 0,
		});
	}
};

// Middleware to get average cost after saving document
// this.model('Course') == this.constructor in Course Model File
CourseSchema.post('save', function () {
	this.model('Course').getAverageCost(this.bootcamp);
});

// Middleware to get average cost after removing
CourseSchema.post('remove', function () {
	this.model('Course').getAverageCost(this.bootcamp);
});

module.exports = Mongoose.model('Course', CourseSchema, 'coursesColl');
