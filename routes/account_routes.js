const express = require('express');
const router = express.Router();
const Account = require('../schemas/accountSchema');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const verifyToken = require('../verify_token');

const checkIfExist = (account, notExistsCallback, existsCallback) => {
	Account.findOne({email: account.email}, (err, account) => {
		if (err) return res.status(500).send('Error on the server.');
		if (account) return existsCallback();
		notExistsCallback();	
	});
};

const excludeData = (account) => {
	let newAcc = account.toJSON();
	delete newAcc.password;
	return newAcc;
};

router.post('/', (req, res) => {
	const body = req.body;
	const hashedPassword = bcrypt.hashSync(body.password, 8);
	let account = new Account(body);
	account.password = hashedPassword;
	account.cars = [];

	checkIfExist(account,
		() => {
			account.save((err, savedAccount) => {
				if (err) return res.status(500).send('Error on the server.');

				// create a token
			    var token = jwt.sign({ id: savedAccount._id }, config.secret, {
					expiresIn: config.tockenExpires
				});
				res.status(200).json({auth: true, token});
			});
		},
		() => {
			res.status(409).json({error: "Account already exists"});
		}
	);
});

router.post('/login', (req, res) => {
	Account.findOne({ email: req.body.email }, function (err, account) {
		if (err) return res.status(500).send('Error on the server.');
		if (!account) return res.status(404).send('No user found.');

		let passwordIsValid = bcrypt.compareSync(req.body.password, account.password);

		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

		let token = jwt.sign({ id: account._id }, config.secret, {
			expiresIn: config.tockenExpires
		});

		res.status(200).send({ auth: true, token: token });
	});
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get('/me', verifyToken, (req, res) => {
	const token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

		Account.findById(decoded.id, {password: 0}, (err, account) => {
			if (err) return res.status(500).send('There was a problem finding the user.');
			if (!account) return res.status(404).send('No user found');

			res.status(200).send(excludeData(account));
		});
	});
});

router.get('/', (req, res) => {
	let accountsArr = [];
	Account.find({}, (err, accounts) => {
		if (err) return res.status(500).send('Error on the server.');
		accounts.forEach((account) => {
			accountsArr.push(excludeData(account));
		});
		res.status(200).json(accountsArr);
	});
});

module.exports = router;