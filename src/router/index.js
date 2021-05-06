const express = require('express');
const router = express.Router();
const user = require('./user');
const details = require('./product')




router.use(express.static('dist'));
router.use('/user', user);
router.use('/details',details)



module.exports = router;    