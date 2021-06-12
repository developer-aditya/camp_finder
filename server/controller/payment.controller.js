const Razorpay = require('razorpay');
const Enroll = require('../models/enrolls.model');
const crypto = require('crypto');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc  POST Setup razorpay order
// @route /payments/order
// @access private
exports.setOrder = asyncHandler(async (req, res, next) => {
	try {
		const { fees, course } = req.body;
		const resCheck = await Enroll.findOne({ user: req.user._id, course });
		if (resCheck) {
			return next(
				new ErrorResponse('User Already Enrolled in This Course', 400),
			);
		}

		const options = {
			amount: fees * 100, // amount in smallest currency unit
			currency: 'INR',
			receipt: crypto.randomBytes(10).toString('hex'),
			payment_capture: 1,
		};
		const razorpay = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});
		const order = await razorpay.orders.create(options);

		res.status(200).json({
			success: true,
			data: { id: order.id, currency: order.currency, amount: order.amount },
		});
	} catch (error) {
		return next(new ErrorResponse(error, 503));
	}
});

// @desc  POST Confirm Payment order
// @route /payments/check
// @access private
exports.confirmOrder = asyncHandler(async (req, res, next) => {
	const {
		razorpay_order_id,
		razorpay_payment_id,
		razorpay_signature,
		course,
		bootcamp,
	} = req.body;

	const signature = crypto
		.createHmac('sha256', process.env.RAZORPAY_SECRET)
		.update(razorpay_order_id + '|' + razorpay_payment_id)
		.digest('hex');

	if (signature === razorpay_signature) {
		const data = {
			orderId: razorpay_order_id,
			paymentId: razorpay_payment_id,
			user: req.user._id,
			course,
			bootcamp,
		};
		const enrolled = await Enroll.create(data);
		res.status(200).json({
			success: true,
			msg: 'You Have Been Enrolled in this Course',
		});
	} else {
		return next(new ErrorResponse(`Unable to Confirm your payment`, 400));
	}
});
