const express = require('express');
const router = express.Router();
const Account = require('../schemas/accountSchema');

router.post('/', (req, res) => {
    const body = req.body;
    
    Account.update({_id: body._id}, body, (err, savedAccount) => {
        if (err) return res.status(500).send('Error on the server.');

        res.status(200).json(savedAccount);
    });
});

module.exports = router;