// Util Parse the Response from Geocoder Api Mapquest
const NodeGeocoder = require('node-geocoder');

const options = {
	provider: process.env.PROVIDER,
	apiKey: process.env.API_KEY, // for Mapquest, OpenCage, Google, locationiq
	formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
