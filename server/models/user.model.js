const colors = require('colors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email',
		],
	},
	role: {
		type: String,
		enum: ['user', 'publisher'],
		default: 'user',
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordTokenExpire: Date,

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Static mongoose function run on model they are attached to model
// method function run on promise return after running query
// Example
// const user = User.find() ---- find() is predefined static function
// user.findPassword() ---- findPassword() is method function

// Encrypting password before saving document
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Method Function to Validate Password
UserSchema.methods.validatePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Method Function to Generate reset password token
UserSchema.methods.resetPasswordTokenGenerator = function () {
	const randomToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(randomToken)
		.digest('hex');
	this.resetPasswordTokenExpire = new Date(Date.now() + 10 * 60 * 1000);

	return randomToken;
};

// Method Function  to return token
UserSchema.methods.getSignedJwt = function () {
	return jwt.sign(
		{ id: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
			algorithm: 'HS256',
			expiresIn: process.env.JWT_EXPIRE_IN,
		},
	);
};

module.exports = Mongoose.model('User', UserSchema, 'userColl');
