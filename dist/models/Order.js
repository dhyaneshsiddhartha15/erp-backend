"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    customer: {
        name: {},
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
        },
        products: [
            {
                product: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price: { type: Number, required: true },
            }
        ],
        totalAmount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map