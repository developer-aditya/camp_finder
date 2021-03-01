const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const path = require('path');

// Loading logger middleware
const logger = require('./middleware/logger');

// Importing Routers
const bootcampRouter = require('./routers/bootcamps.route');
const courseRouter = require('./routers/courses.route');

// Parsing .env and getting Environment variable in process object of node
dotenv.config({ path: process.cwd() + '/config/config.env' });

// Establishing DB Connection
connectDB();

// Initializing express server
const app = express();

// making public folder static
app.use(express.static(path.join(__dirname, '/server/public')));

// Middleware to read req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middleware to upload file
app.use(fileupload());

// Logger Middleware
app.use(logger);

// Mount routers
app.use('/api/v1/bootcamps', bootcampRouter);
app.use('/api/v1/courses', courseRouter);

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
