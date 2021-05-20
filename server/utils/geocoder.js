// Util Parse the Response from Geocoder Api Mapquest
const NodeGeocoder = require('node-geocoder');

const options = {
	provider: 'mapquest',
	// Optional depending on the providers
	apiKey: 'kQZjoOEu32EjDkeovJrhxuMGRGxssK6u', // for Mapquest, OpenCage, Google Premier
	formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
