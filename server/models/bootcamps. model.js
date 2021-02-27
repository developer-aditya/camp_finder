const Mongoose = require('mongoose');
const Slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new Mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please Add The Name'],
		unique: true,
		trim: true,
		maxlength: [50, 'Name cannot be greater than 50 words'],
	},
	// Slug is lowercase simplified form of name (url friendly) (DevCamper Bootcamp ->devcamper-bootcamp)
	slug: String,
	description: {
		type: String,
		required: [true, 'Please Add Description'],
		maxlength: [500, 'Description cannot be greater than 500 words'],
	},
	website: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'Please use a valid URL with HTTP or HTTPS',
		],
	},
	phone: {
		type: String,
		maxlength: [20, 'Phone number can not be longer than 20 characters'],
	},
	email: {
		type: String,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email',
		],
	},
	address: {
		type: String,
		required: [true, 'Please add an address'],
	},
	location: {
		// GeoJSON Point
		type: {
			type: String,
			enum: ['Point'],
		},
		coordinates: {
			type: [Number],
			index: '2dsphere',
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String,
	},
	careers: {
		// Array of strings
		type: [String],
		required: true,
		enum: [
			'Web Development',
			'Mobile Development',
			'UI/UX',
			'Data Science',
			'Business',
			'Other',
		],
	},
	averageRating: {
		type: Number,
		min: [1, 'Rating must be at least 1'],
		max: [10, 'Rating must can not be more than 10'],
	},
	avgCost: Number,
	photo: {
		type: String,
		default: 'no-photo.jpg',
	},
	housing: {
		type: Boolean,
		default: false,
	},
	jobAssistance: {
		type: Boolean,
		default: false,
	},
	jobGuarantee: {
		type: Boolean,
		default: false,
	},
	acceptGi: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Mongoose Middlewares
// Slugifying name
BootcampSchema.pre('save', function (next) {
	this.slug = Slugify(this.name, { lower: true });
	next();
});

// Converting address to geocode
BootcampSchema.pre('save', async function (next) {
	const res = await geocoder.geocode(this.address);
	this.location = {
		type: 'Point',
		coordinates: [res[0].longitude, res[0].latitude],
		formattedAddress: res[0].formattedAddress,
		street: ` ${res[0].streetName},  ${res[0].streetNumber}`,
		city: res[0].city,
		state: res[0].formattedAddress,
		zipcode: res[0].zipcode,
		country: res[0].countryCode,
	};
	next();
});

module.exports = Mongoose.model(
	'Bootcamp',
	BootcampSchema,
	'bootcampsColl',
);
