
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
                let i = 0;
                let getData = data.products
                while (i < getData.length) {
                    await billingAndProduct.findOneAndUpdate({ _id: req.query.id }, { $push: { product_details: `name:${getData[i]}` } });
                    i++;
                }
                return res.status(200).send(this.successFormat('Added Successfully'))
            }
            let i = 0;
            let payload = [];
            let getData = data.products
            while (i < getData.length) {
                payload.push(`name:${getData[i]}`)
                i++;
            }
            let details = {
                user: req.user.user,
                product_details: payload
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
            let i = 0;
            let products = []
            let getData = result.product_details;
            while (i < getData.length) {
                products.push(getData[i])
                i++;
            }
            let payload = {
                _id: result._id,
                user: result.user,
                product_details: products,
                created_date: result.created_date,
                modified_date_time: result.modified_date_time
            }
            return res.status(200).send(this.successFormat(payload))
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

