"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
// Define log levels and their severity
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    return process.env.NODE_ENV === "development" ? "debug" : "info";
};
// Log format configuration
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf(({ timestamp, level, message, stack }) => `${timestamp} [${level}]: ${stack || message}`));
// File transport options
const fileTransport = new winston_1.default.transports.File({
    filename: "logs/error.log",
    level: "error",
});
// Console transport options
const consoleTransport = new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), // Add color to console logs
    winston_1.default.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)),
});
// Create logger instance
exports.logger = winston_1.default.createLogger({
    level: level(),
    levels: logLevels,
    format: logFormat,
    transports: [
        fileTransport, // Logs errors to a file
        consoleTransport, // Logs to console
    ],
});
// If we're not in production, log stack traces for errors
if (process.env.NODE_ENV !== "production") {
    exports.logger.exceptions.handle(new winston_1.default.transports.File({ filename: "logs/exceptions.log" }));
}
//# sourceMappingURL=logger.js.map