import Joi from "joi";

export const inventorySchema = Joi.object({
    product: Joi.string().required().messages({
        "any.required": "Product ID is required",
    }),
    stockIn: Joi.number().min(0).required().messages({
        "any.required": "Stock-in quantity is required",
        "number.min": "Stock-in quantity must be a positive number",
    }),
    stockOut: Joi.number().min(0).default(0).messages({
        "number.min": "Stock-out quantity must be a positive number",
    }),
    currentStock: Joi.number().min(0).required().messages({
        "any.required": "Current stock is required",
        "number.min": "Current stock cannot be negative",
    }),
    threshold: Joi.number().min(0).required().messages({ 
        "any.required": "Threshold value is required",
        "number.min": "Threshold must be a non-negative number",
    }),
    batchNumber: Joi.string().optional().messages({
        "string.base": "Batch number should be a string",
    }),
    expiryDate: Joi.date().optional().messages({
        "date.base": "Expiry date should be a valid date",
    }),
    warehouse: Joi.string().optional().messages({
        "string.base": "Warehouse ID should be a valid string",
    }),
});
