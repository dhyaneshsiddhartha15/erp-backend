import mongoose, { Document, Schema, Model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';


const orderSchema:Schema <IOrder>=new mongoose.Schema(
  {
    customer:{
      name:{

      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:String,
      },
      products:[
        {
          product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',

            required:true,
          },
          quantity:{
            type:Number,
            required:true
          },
          price: { type: Number, required: true },
        }
      ],
      totalAmount:{type:Number,required:true},
      paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    }
  },{
    timestamps:true,
  }
)

const Order:Model <IOrder>=mongoose.model<IOrder>('Order',orderSchema);
export default Order;