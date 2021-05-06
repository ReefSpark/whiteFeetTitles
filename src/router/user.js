const express = require('express');
const router = express.Router();
const user = require('../core/user')
const Controller = require('../core/controller');
const controller = new Controller;
const auth = require('../middleware/auth');
const { loginValidation } = require('../validation/user.validations');

router.post('/login', async (req, res) => {
    try {
        let { error } = await loginValidation(req.body)
        if (error) {
            return res.status(400).send(controller.errorFormat(error.message));
        }
        return user.login(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat(err.message));
    }
});

router.get('/view-details', auth, async (req, res) => {
    try {
       return  user.viewDetails(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat(err.message));
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        return user.logout(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat(err.message));
    }
});

module.exports = router;