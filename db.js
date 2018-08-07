const mongoose = require('mongoose');
const config = require('./config.js');
const mongoDB = config.dbConnectionUrl;

const connectToDb = () => {
	mongoose.connect(mongoDB, {useNewUrlParser: true});
	mongoose.Promise = global.Promise;
	const db = mongoose.connection;
	db.on('connected', console.log.bind(console, 'MongoDB connection opened'));
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));

	process.on('SIGINT', () => {  
		mongoose.connection.close(() => { 
			console.log('Mongoose default connection disconnected through app termination'); 
			process.exit(0); 
		});
	});
};

module.exports = {
	connectToDb
}
