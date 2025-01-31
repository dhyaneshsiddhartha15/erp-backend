"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.inventorySchema = joi_1.default.object({
    product: joi_1.default.string().required().messages({
        "any.required": "Product ID is required",
    }),
    stockIn: joi_1.default.number().min(0).required().messages({
        "any.required": "Stock-in quantity is required",
        "number.min": "Stock-in quantity must be a positive number",
    }),
    stockOut: joi_1.default.number().min(0).default(0).messages({
        "number.min": "Stock-out quantity must be a positive number",
    }),
    currentStock: joi_1.default.number().min(0).required().messages({
        "any.required": "Current stock is required",
        "number.min": "Current stock cannot be negative",
    }),
    batchNumber: joi_1.default.string().optional().messages({
        "string.base": "Batch number should be a string",
    }),
    expiryDate: joi_1.default.date().optional().messages({
        "date.base": "Expiry date should be a valid date",
    }),
    warehouse: joi_1.default.string().optional().messages({
        "string.base": "Warehouse ID should be a valid string",
    }),
});
//# sourceMappingURL=inventorySchema.js.map