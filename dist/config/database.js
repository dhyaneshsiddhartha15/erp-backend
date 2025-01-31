"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect = () => {
    mongoose_1.default.connect(process.env.MONGODB_URL)
        .then(() => console.log("DB Connected successfully"))
        .catch((error) => {
        console.error("DATABASE ERROR");
        console.error(error);
        process.exit(1);
    });
};
exports.connect = connect;
//# sourceMappingURL=database.js.map