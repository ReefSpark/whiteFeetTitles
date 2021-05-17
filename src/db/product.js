const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'title-users' },
    "Billing_basic_details": {
        "billing_address": String,
        "gst_no": Number,
        "mobile": Number,
        "supervisor_no": Number,
        "account_no": Number,
        "mode_of_payment": String,
        "check_details": Number
    },
    "product_details": [String],
    "gst_applied": String,
    "net_amount": Number,
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date_time' }
});
let billingAndProduct = mongoose.model('billing-product-details', schema);
billingAndProduct.createIndexes();
exports.billingAndProduct = billingAndProduct;
