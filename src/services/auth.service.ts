import { logger } from "../config/logger";
import { IUser } from "../interfaces/user.interface";
import User from "../models/User";



export const userService = {
  create: async (
    name: string,
    email: string,
    hashPassword: string,
    role: string
  ): Promise<IUser>=> {
    try {
      const userDoc = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      return userDoc;
    } catch (error) {
      logger.error("Error creating user: %s", error);
      throw error;
    }
  },
};

export async function getAuthUserByEmail(email: string): Promise<IUser | null> {
    try {
        const user = await User.findOne({ email }).exec();  
        if (!user) {
            logger.warn(`No user found with email: ${email}`);
            return null;  
        }
        console.log("User found from service is:", user);
        return user;
    } catch (error) {
        logger.error("Error fetching user by email: %s", error);
        throw error;
    }
}
