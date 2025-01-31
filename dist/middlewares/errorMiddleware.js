"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_1 = require("../config/logger");
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.log("error: " + message);
    logger_1.logger.error(`${message} - ${req.method} ${req.url} - ${err.stack || ""}`);
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            statusCode,
        },
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map