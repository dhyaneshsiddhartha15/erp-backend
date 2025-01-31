"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../config/logger");
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';
const JWT_EXPIRES_IN = '24h';
function signToken(userId, email, name) {
    try {
        const token = jsonwebtoken_1.default.sign({
            userId,
            email,
            name
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });
        return token;
    }
    catch (error) {
        logger_1.logger.error('Error generating JWT token:', error);
        throw new Error('Failed to generate authentication token');
    }
}
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        logger_1.logger.error('Error verifying JWT token:', error);
        throw new Error('Invalid or expired token');
    }
}
//# sourceMappingURL=jwt.js.map