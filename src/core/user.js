const moment = require('moment');
const { users, tokens } = require('../db/user');
const { billingAndProduct } = require('../db/product')
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const controller = require('../core/controller');
const branca = require("branca")(config.get('encryption.realKey'));
const _ = require('lodash');

class User extends controller {
    async login(req, res) {
        try {
            let data = req.body;
            let checkEmail = await users.findOne({ mobile: data.mobile });
            if (_.isEmpty(checkEmail)) {
                return res.status(400).send(this.errorMsgFormat({ message: "Email or Password Incorrect" }))
            }
            //data.password = await helpers.decrypt(data.password, res);
            let passwordCompare = await bcrypt.compareSync(data.password, checkEmail.password);
            if (!passwordCompare) {
                return res.status(400).send(this.errorMsgFormat({ message: "Email or Password Incorrect" }))
            }
            checkEmail.login_time = new Date();
            checkEmail.save()
            return res.status(200).send(this.successFormat({
                role: checkEmail.role,
                token: await this.createToken(checkEmail, res)
            }))
        }
        catch (err) {
            return res.status(400).send(this.errorMsgFormat(err.message));
        }
    }

    async createToken(user, res) {
        try {
            let jwtOptions = Object.assign({}, {
                issuer: config.get('secrete.issuer'),
                subject: 'Authentication',
                audience: config.get('secrete.domain'),
                expiresIn: config.get('secrete.expiry')
            });
            let tokenAccess = Object.assign({}, {
                user: user._id,
                role: user.role
            });
            let encryptToken = branca.encode(JSON.stringify(tokenAccess));
            let token = await jwt.sign({ encryptToken }, config.get('secrete.key'), jwtOptions);
            await tokens.updateMany({ user: user._id, is_deleted: false }, { is_deleted: true });
            await new tokens({
                user: user._id,
                token: token
            }).save()
            return token

        } catch (err) {
            return res.status(400).send(this.errorMsgFormat(err.message));
        }

    }

    async logout(req, res) {

        try {
            await tokens.updateMany({ user: req.user.user, is_deleted: false }, { is_deleted: true });
            await users.findOneAndUpdate({ _id: req.user.user }, { logout_time: new Date() });
            return res.status(200).send(this.successFormat({
                'message': 'Your Logout Successfully'
            }, user._id, 'users', 200))
        } catch (err) {
            return res.status(400).send(this.errorMsgFormat(err.message));
        }

    }

    async viewDetails(req, res) {
        try {
            let checkUser = await users.findOne({ _id: req.user.user });
            if (checkUser.role == 2) {
                let result = await billingAndProduct.find({ user: req.user.user });
                return res.status(200).send(this.successFormat(result))
            }
            var start = new Date();
            start.setHours(0, 0, 0, 0);
            var end = new Date();
            end.setHours(23, 59, 59, 999);
            let result = await billingAndProduct.find({ created_date: { $gte: start, $lt: end } });
            return res.status(200).send(this.successFormat(result))
        } catch (err) {
            return res.status(400).send(this.errorMsgFormat(err.message));
        }

    }

}

module.exports = new User;

