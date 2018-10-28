const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	password: String,
	registrationDate: Number,
	cars: [[{type: Schema.Types.ObjectId, ref: 'Car'}]]
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;