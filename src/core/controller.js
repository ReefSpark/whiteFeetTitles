
class Controller {

    errorMsgFormat(message) {
        return Object.assign({
            "status":false,
            "message": message
        });
    }

    errorFormat(error) {
        let errors = {};
        if (error.details) {
            error.details.forEach((detail) => {
                errors[detail.path] = detail.message;

            });
        } else {
            errors = error;
        }
        return this.errorMsgFormat(errors);
    }

    successFormat(message,res) {
        return Object.assign({
            "status":true,
            "message": message,
            "data":res
        });
    }
    
    requestDataFormat(data) {
        return {
            "lang": "en",
            "data": {
                "attributes": data
            }
        };
    }
}

module.exports = Controller;