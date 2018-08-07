const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = mongoose.Schema({
	manufacture: {type: Schema.Types.ObjectId, ref: 'Brand'},
	model: String,
	subModel: String,
	vinNumber: String,
	yearOfManufacture: String,
	engineVolume: Number,
	fuelType: String,
	color: String
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;