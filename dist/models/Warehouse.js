"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const warehouseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    manager: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    zones: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose_1.default.model('Warehouse', warehouseSchema);
//# sourceMappingURL=Warehouse.js.map