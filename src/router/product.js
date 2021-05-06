
const express = require('express');
const router = express.Router();
const Controller = require('../core/controller');
const controller = new Controller;
const product = require('../core/product');
const { addProduct } = require('../validation/product.validation');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
    try {
        let { error } = await addProduct(req.body)
        if (error) {
            return res.status(400).send(controller.errorFormat(error.message));
        }
        return product.addProduct(req, res);
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat(err.message));
    }
});

router.get('/', auth,async (req, res) => {
    try {

        return product.getProduct(req, res);
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat(err.message));
    }
});

router.patch('/:id', auth,async (req, res) => {
    try {

        return product.updateProduct(req, res);
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat(err.message));
    }
});


module.exports = router;