const fs = require('fs');
const colors = require('colors');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');

// Parsing .env and getting Environment variable in process object of node
dotenv.config({ path: process.cwd() + '/config/config.env' });

// To use config in bootcamp model
const Bootcamp = require('./server/models/bootcamps. model');

// To use config in course model
const Course = require('./server/models/courses.model');

async function connectDB() {
	const conn = await Mongoose.connect(
		'mongodb://localhost:27017/devcamper',
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		},
	);

	console.log(
		`Connected To ${conn.connection.host}:${conn.connection.port} `,
	);
}

const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/bootcamps.json`, {
		encoding: 'utf8',
	}),
);

const courses = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/courses.json`, {
		encoding: 'utf8',
	}),
);

const importData = async (bootcamps) => {
	const resBootcamp = await Bootcamp.create(bootcamps);
	const resCourse = await Course.create(courses);
	console.log(colors.green.inverse('Data added Sucessfully...'));
	Mongoose.connection.close(() => {
		console.log('Mongoose default connection is disconnected');
	});
};

const deleteAllData = async () => {
	const resBootcamp = await Bootcamp.deleteMany();
	const resCourse = await Bootcamp.deleteMany();
	console.log(colors.red.inverse('Data Deleted Sucessfully...'));
	Mongoose.connection.close(() => {
		console.log('Mongoose default connection is disconnected');
	});
};

connectDB();
// console.log(process.argv);
if (process.argv[2] === '-i') importData(bootcamps);
if (process.argv[2] === '-d') deleteAllData();
