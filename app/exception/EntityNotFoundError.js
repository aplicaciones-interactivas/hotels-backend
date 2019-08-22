const CustomError = require('./CustomError');

class EntityNotFoundError extends CustomError {
    constructor(message) {
        super('400000', message);
    }


}

module.exports = EntityNotFoundError;