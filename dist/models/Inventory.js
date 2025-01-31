"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const inventorySchema = new mongoose_1.default.Schema({
    product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
    stockIn: { type: Number, required: true },
    stockOut: { type: Number, default: 0 },
    currentStock: { type: Number, required: true },
    threshold: { type: Number, required: true, default: 5 }, // For low stock alerts
    batchNumber: { type: String },
    expiryDate: { type: Date },
    costPrice: { type: Number, required: true }, // For inventory valuation
    warehouse: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Warehouse' },
    updatedAt: { type: Date, default: Date.now },
});
const Inventory = mongoose_1.default.model('Inventory', inventorySchema);
exports.default = Inventory;
//# sourceMappingURL=Inventory.js.map