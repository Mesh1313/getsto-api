const express = require('express');
const router = express.Router();
const Sto = require('../schemas/stoSchema.js');

// This requires needed for populate
require('../schemas/brandSchema.js');
require('../schemas/serviceSchema.js');
require('../schemas/serviceTypeSchema.js');

router.get('/', (req, res) => {
	Sto.stoKy.find({})
		.populate('service_type')
		.populate('brands')
		.populate('services')
		.exec((err, stos) => {
			if (err) return console.error('Error geting stos. ERR: ', err);
			res.status(200).json(stos);
		});
});

module.exports = router;