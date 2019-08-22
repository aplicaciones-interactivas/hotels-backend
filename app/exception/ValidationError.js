const CustomError = require('./CustomError');

class ValidationError extends CustomError {
    constructor(message) {
        super('400001', message);
    }
}

module.exports = ValidationError;