const Joi = require('joi');

exports.loginValidation = (req) => {
    let schema = Joi.object().keys(Object.assign({
        mobile: Joi.string().required(),
        password: Joi.string().required()
    }));

    return schema.validate(req, { abortEarly: false })
}

