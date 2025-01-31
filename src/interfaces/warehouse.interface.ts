import mongoose, { Document } from "mongoose";

export interface IWarehouse extends Document{
name:string,
location:string,
manager:mongoose.Types.ObjectId,
zones:string,
createdAt:Date,
}