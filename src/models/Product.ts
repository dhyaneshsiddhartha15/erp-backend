import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true, 
    },
    qrCode: {
      type: String,
    },
    stocks: {
      type: Number,
      default: 0,
    },
    // warehouse: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Warehouse',
    //   required: true, 
    // },
    status: {
      type: String,
      enum: ["instock", "sold", "in_transit", "delivered"],
      default: "instock",
    },
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
