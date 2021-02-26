const fs = require('fs');
const colors = require('colors');
const BootcampModel = require('./server/models/bootcamps. model');
const Mongoose = require('mongoose');

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

async function addAll() {
	const data = fs.readFileSync('./_data/bootcamps.json', {
		encoding: 'utf8',
	});
	await BootcampModel.create(JSON.parse(data));
	console.log(colors.green.inverse('Bootcamps added Sucessfully'));
}

async function removeAll() {
	await BootcampModel.deleteMany();
	console.log(colors.red.inverse('All Bootcamps Deleted Sucessfully'));
}

connectDB();
// addAll();
removeAll();
