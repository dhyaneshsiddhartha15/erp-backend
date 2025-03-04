import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  qrCode: string;
  stocks: number;
  warehouse: mongoose.Types.ObjectId;
  status: "instock" | "sold" | "in_transit" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}
