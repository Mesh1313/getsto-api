const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db.js');
const api = require('./router.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

db.connectToDb();

const port = 8181;

app.listen(port, () => {
	console.log(`API SERVER STARTED ON PORT ${port}...`);
});