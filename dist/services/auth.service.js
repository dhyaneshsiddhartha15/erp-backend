"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
exports.getAuthUserByEmail = getAuthUserByEmail;
const logger_1 = require("../config/logger");
const User_1 = __importDefault(require("../models/User"));
exports.userService = {
    create: (name, email, hashPassword, role) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDoc = yield User_1.default.create({
                name,
                email,
                password: hashPassword,
                role,
            });
            return userDoc;
        }
        catch (error) {
            logger_1.logger.error("Error creating user: %s", error);
            throw error;
        }
    }),
};
function getAuthUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findOne({ email }).exec();
            if (!user) {
                logger_1.logger.warn(`No user found with email: ${email}`);
                return null;
            }
            console.log("User found from service is:", user);
            return user;
        }
        catch (error) {
            logger_1.logger.error("Error fetching user by email: %s", error);
            throw error;
        }
    });
}
//# sourceMappingURL=auth.service.js.map