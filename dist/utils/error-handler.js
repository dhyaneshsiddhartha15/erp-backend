"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.FileTooLargeError = exports.NotAuthorizedError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message, comingFrom) {
        super(message);
        this.comingFrom = comingFrom;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    serializeErrors() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            comingFrom: this.comingFrom
        };
    }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = 'error';
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        this.status = 'error';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class NotAuthorizedError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        this.status = 'error';
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
class FileTooLargeError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.REQUEST_TOO_LONG;
        this.status = 'error';
        Object.setPrototypeOf(this, FileTooLargeError.prototype);
    }
}
exports.FileTooLargeError = FileTooLargeError;
class ServerError extends CustomError {
    constructor(message, comingFrom) {
        super(message, comingFrom);
        this.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        this.status = 'error';
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=error-handler.js.map