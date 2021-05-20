// Util To send Email
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: `${process.env.GMAIL_ACCOUNT}`,
			pass: `${process.env.GMAIL_PASSWORD}`,
		},
	});

	var mailOptions = {
		from: `${process.env.GMAIL_ACCOUNT}`,
		to: `${options.email}`,
		subject: `${options.subject}`,
		text: `${options.message}`,
	};

	const info = await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
