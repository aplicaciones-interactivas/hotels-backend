class CustomError extends Error {

    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }

    toString() {
        return 'Error=' + this.name + ' code=' + this.code + ' message:' + this.message;
    }
}

module.exports = CustomError;