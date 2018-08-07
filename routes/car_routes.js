const express = require('express');
const router = express.Router();
const Car = require('../schemas/carSchema.js');
const Brand = require('../schemas/brandSchema.js');

router.post('/', (req, res) => {
	const body = req.body;
	console.log(body);
});

module.exports = router;