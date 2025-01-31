"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object().keys({
    name: joi_1.default.string().min(4).max(12).required().messages({
        'string.base': 'Name must be of type string',
        'string.min': 'Invalid name',
        'string.max': 'Invalid name',
        'string.empty': 'Name is a required field'
    }),
    password: joi_1.default.string().min(4).max(12).required().messages({
        'string.base': 'Password must be of type string',
        'string.min': 'Invalid password',
        'string.max': 'Invalid password',
        'string.empty': 'Password is a required field'
    }),
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email must be of type string',
        'string.email': 'Invalid email',
        'string.empty': 'Email is a required field'
    }),
    role: joi_1.default.string()
        .valid('admin', 'cashier', 'warehouse_manager', 'sales_team', 'inventory_manager')
        .default('sales_team')
        .messages({
        'any.only': 'Invalid role provided'
    }),
});
exports.signupSchema = signupSchema;
//# sourceMappingURL=signup.js.map