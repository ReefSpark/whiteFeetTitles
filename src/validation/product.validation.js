const Joi = require('joi');


exports.updateProduct = (req) => {
    let schema = Joi.object().keys(Object.assign({
        "Billing_basic_details": Joi.object().keys(Object.assign({
            "billing_address": Joi.string(),
            "gst_no": Joi.number(),
            "mobile": Joi.number(),
            "supervisor_no": Joi.number(),
            "account_no": Joi.number(),
            "mode_of_payment": Joi.string(),
            "check_details": Joi.number()
        })),
        "product_details": Joi.array().items(
            Joi.object().keys(Object.assign({
                "name": Joi.string().required(),
                "nos": Joi.number(),
                "rate": Joi.number(),
                "total_amount": Joi.number()
            }))),
        "gst_applied": Joi.string(),
        "net_amount": Joi.number()
    }));

    return schema.validate(req, { abortEarly: false })
}

