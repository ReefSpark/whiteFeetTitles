
const { billingAndProduct } = require('../db/product')
const config = require('config');
const controller = require('../core/controller');
const _ = require('lodash');

class Product extends controller {
    async addProduct(req, res) {
        try {
            let data = req.body;
            if (req.query.id) {
                let check = await billingAndProduct.findOne({ _id: req.query.id });
                if (_.isEmpty(check)) {
                    return res.status(400).send(this.errorMsgFormat("ID didn't match"));
                }
                await billingAndProduct.findOneAndUpdate({ _id: req.query.id }, { $push: { product_details: data } });
                return res.status(200).send(this.successFormat('Added Successfully'))
            }
            let details = {
                user: req.user.user,
                product_details: data
            }

            await new billingAndProduct(details).save();
            return res.status(200).send(this.successFormat("Added Successfully"));
        }
        catch (err) {
            return res.status(400).send(this.errorMsgFormat(err.message));
        }
    }

    async getProduct(req, res) {
        try {
            let result = await billingAndProduct.findOne({}).sort({ created_date: -1 });
            return res.status(200).send(this.successFormat(result))
        } catch (err) {
            return res.status(400).send(this.errorMsgFormat(err.message));
        }
    }

    async updateProduct(req, res) {
        try {
            let checkDetails = await billingAndProduct.findOne({ _id: req.params.id });
            if (_.isEmpty(checkDetails)) {
                return res.status(400).send(this.errorMsgFormat("ID didn't match"));
            }
            await billingAndProduct.findOneAndUpdate({ _id: req.params.id }, req.body);
            return res.status(200).send(this.successFormat("Updated Successfully"));
        } catch (err) {
            return res.status(400).send(this.errorMsgFormat(err.message));
        }

    }

}

module.exports = new Product;

