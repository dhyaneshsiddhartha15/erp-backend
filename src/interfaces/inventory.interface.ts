import mongoose, { Document } from "mongoose";


export interface IInventory extends Document{
    product:mongoose.Types.ObjectId; 
    stockIn:number,
    stockOut:number,
    threshold:number,
    costPrice:number
    currentStock:number,
    batchNumber:String,
    expiryDate:Date,
    warehouse:mongoose.Types.ObjectId;
    updatedAt: Date,
}