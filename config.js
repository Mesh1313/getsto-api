const PASSWORD = process.env.db_password;

module.exports = {
	dbConnectionUrl: `mongodb+srv://stos_user:${PASSWORD}@cluster0.l7ypl.mongodb.net/stos_db?retryWrites=true&w=majority`,
	secret: 'getstosecrete',
	tockenExpires: 86400 // expires in 24 hours
};