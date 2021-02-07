const express = require('express');
const dotenv = require('dotenv');

// Loading Bootcamp router
const bootcamps = require('./routers/bootcamps');

// Loading logger middleware
const logger = require('./middleware/logger');

// Parsing .env and getting Environment variable in process object of node
dotenv.config({ path: process.cwd() + '/config/config.env' });

// Initializing express server
const app = express();

// Middleware to read req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Intializing routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 8000;
app.listen(
	PORT,
	console.log(
		`Server Running in ${process.env.NODE_ENV} mode on Port : ${PORT}`,
	),
);
