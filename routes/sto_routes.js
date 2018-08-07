const express = require('express');
const router = express.Router();
const Sto = require('../schemas/stoSchema.js');
const Brand = require('../schemas/brandSchema.js');
const Service = require('../schemas/serviceSchema.js');
const ServiceType = require('../schemas/serviceTypeSchema.js');

router.get('/', (req, res) => {
	Sto.find({})	
		.populate('service_type')
		.populate('brands')
		.populate('services')
		.exec((err, stos) => {
			if (err) return console.error('Error geting stos. ERR: ', err);
			res.status(200).json(stos);
		});
});

module.exports = router;