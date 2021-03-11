const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const path = require('path');
const cookieParser = require('cookie-parser');

// Security Packages
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
var xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
var hpp = require('hpp');

// Loading logger middleware
const logger = require('./middleware/logger');

// Importing Routers
const bootcampRouter = require('./routers/bootcamps.route');
const courseRouter = require('./routers/courses.route');
const authRouter = require('./routers/auth.route');
const userRouter = require('./routers/users.route');
const reviewRouter = require('./routers/reviews.route');

// Parsing .env and getting Environment variable in process object of node
dotenv.config({ path: process.cwd() + '/config/config.env' });

// Establishing DB Connection
connectDB();

// Initializing express server
const app = express();

// making public folder static
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to read req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middleware to upload file
app.use(fileupload());
app.use(cookieParser());

// SECURITY

// Sanitizing data sent to api
// used: to handle nosql injections
// ex: email:{$gt: ""} will match first email in db
// ex: password:{$gt: ""} will match first password in db if not hashed
// user after express.json() that will parse req.body
app.use(mongoSanitize());

// Set Necessary Security feilds in header
app.use(helmet());

// Preventing Cross site scripting(xss) / script injection
// adding <script></script> while creating bootcamp or something so that when that data loads in frontend
// malcious scripts get into html
// XSS-Clean converts < to HTML &lt; which shows on UI as < but in HTML it will BE &lt;
// Sanitizing data sent to api
app.use(xss());

// Limiting Api calls from a single IP
const limiter = rateLimit({
	// 100 requests per 10 minutes for a single ip
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Prevent HTTP Params Pollution attack
// Sending multiple params with same name in url express makes an array of it
// which will cause backend code to crash : This would allow attacker make error in our code
app.use(hpp());

// Logger Middleware
app.use(logger);

// Mount routers
app.use('/api/v1/bootcamps', bootcampRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Error Middleware for custom error message
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(
	PORT,
	console.log(
		`Server Running in ${process.env.NODE_ENV} mode on Port : ${PORT}`,
	),
);

process.on('unhandledRejection', (error, promise) => {
	console.log(`${error.name}: ${error.message}`);
	// close server & exit process with 1
	// 1 Error exit in node
	// 0 Sucessful exit in node
	server.close(() => {
		console.log('Server Closed');
		process.exit(1);
	});
});

process.on('exit', function (code) {
	return console.log(`Node Process about to close with code ${code}`);
});
