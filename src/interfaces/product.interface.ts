import mongoose, { Document} from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  qrCode: string;
  stocks: number;
  warehouse: mongoose.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}