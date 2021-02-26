const fs = require('fs');
const colors = require('colors');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');

// Parsing .env and getting Environment variable in process object of node
dotenv.config({ path: process.cwd() + '/config/config.env' });

// To use config in bootcamp model
const BootcampModel = require('./server/models/bootcamps. model');

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
	fs.readFileSync('./_data/bootcamps.json', {
		encoding: 'utf8',
	}),
);

const importData = async (bootcamps) => {
	const res = await BootcampModel.create(bootcamps);
	console.log(colors.green.inverse('Bootcamps added Sucessfully'));
};

const deleteAllData = async () => {
	const res = await BootcampModel.deleteMany();
	console.log(colors.red.inverse('All Bootcamps Deleted Sucessfully'));
};

connectDB();
// importData(bootcamps);
deleteAllData();
