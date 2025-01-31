import mongoose, { Schema } from "mongoose";
import { IWarehouse } from "../interfaces/warehouse.interface";
const warehouseSchema:Schema <IWarehouse>=new mongoose.Schema({
    name: { type: String, required: true },
  location: { type: String, required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  zones: [{ type: String }], 
  createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Warehouse', warehouseSchema);