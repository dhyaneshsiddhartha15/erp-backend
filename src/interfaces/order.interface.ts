import mongoose, { Document, Schema, Model } from 'mongoose';

interface ICustomer{
  name:string,
  email:string,
  phone?:string,
}

interface IProduct{
  product:mongoose.Types.ObjectId;
  quantity:number,
  price:number
}

export interface IOrder extends Document{
  customer:ICustomer;
  products:IProduct[];
  totalAmount:number;
  paymentStatus:'pending'|'completed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
