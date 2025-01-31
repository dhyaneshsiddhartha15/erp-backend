import mongoose, { Document, Schema } from "mongoose";
import { IInventory } from "../interfaces/inventory.interface";

const inventorySchema: Schema<IInventory> = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    stockIn: { type: Number, required: true },
    stockOut: { type: Number, default: 0 },
    currentStock: { type: Number, required: true },
    threshold: { type: Number, required: true, default: 5 }, // For low stock alerts
    batchNumber: { type: String },
    expiryDate: { type: Date },
    costPrice: { type: Number, required: true }, // For inventory valuation
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    updatedAt: { type: Date, default: Date.now },
  }
);

const Inventory = mongoose.model<IInventory>('Inventory', inventorySchema);
export default Inventory;
