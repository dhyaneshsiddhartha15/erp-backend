import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const UserSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'cashier', 'warehouse_manager', 'sales_team', 'inventory_manager'], 
      default: 'sales_team',
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
