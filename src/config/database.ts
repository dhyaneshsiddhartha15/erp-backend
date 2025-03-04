import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = (): void => {
    mongoose.connect(process.env.MONGODB_URL as string)
        .then(() => console.log("DB Connected successfully"))
        .catch((error: Error) => {
            console.log("Erro is",error);
            console.error("DATABASE ERROR");
            console.error(error);
            process.exit(1);
        });
};
