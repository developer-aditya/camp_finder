const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const errorHandler = require('./middleware/error');
// Loading logger middleware
const logger = require('./middleware/logger');
// Loading Bootcamp router
const bootcamps = require('./routers/bootcamps.route');

// Parsing .env and getting Environment variable in process object of node
dotenv.config({ path: process.cwd() + '/config/config.env' });

// Establishing DB Connection
connectDB();

// Initializing express server
const app = express();

// Middleware to read req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Intializing routers
app.use('/api/v1/bootcamps', bootcamps);

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
