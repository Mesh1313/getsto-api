const express = require('express');
const router = express.Router();

// Routes
const stoRoutes = require('./routes/sto_routes.js');
const carRoutes = require('./routes/car_routes.js');
const accountRoutes = require('./routes/account_routes.js');
// Routes

router.use('/stos', stoRoutes);
router.use('/cars', carRoutes);
router.use('/accounts', accountRoutes);

module.exports = router;