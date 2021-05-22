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
if (process.env.NODE_ENV === 'production')
	app.use(express.static(path.join(process.cwd(), 'client', 'build')));

// Middleware to read req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to upload files (All Files will be available in req.files)
// Fileupload Parses the formdata and stores all different files in req.files
// FormData named 'image', its data/file will be in req.files.image
app.use(fileupload());

// Middleware to parse cookies (All Cookies will be available in req.cookies)
// Fileupload Parses the cookies sent from client and stores all different cookie in req.cookies
// Cookie named 'token', its data will be in req.cookies.token
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
	max: 100, // limit each IP to 100 requests per windowMsApi
});
app.use(limiter);

// Prevent HTTP Params Pollution attack
// Sending multiple query with same name in url express makes an array of it
// which will cause backend code to crash : This would allow attacker make error in our code
// mongoose will run the array and return result for all element in array if hpp not enabled
// if hpp enabled req.query will have last value in array
// EX- weeks=8&weeks=6 req.query.weeks === [8,6]
// without hpp return result for both values
// with hpp req.query.weeks === 6
app.use(hpp());

// Logger Middleware
app.use(logger);

// Mount routers
app.use('/api/v1/bootcamps', bootcampRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

if (process.env.NODE_ENV === 'production')
	app.get('*', (req, res) => {
		res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
	});

// Error Middleware : any error in req-res cycle is transfered to this last middleware skipping all other middlware it  ends with cycle with error res from server
// All Middleware run in same order as declared route handlers run at last and req-res cycle end
// But Error handler middlware must be declared at last as this should be last middleware to run
// If there is any error in above middlewares or route handler it will be transfered to this
// and req-res cycle shall end after this

// Order of middleware -----
// app-level -> route-level(before route handler) -> route-handlers -> error-handling middleware
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
