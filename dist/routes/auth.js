"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const router = express_1.default.Router();
function authRoutes() {
    console.log("auth");
    router.post('/signup', user_controllers_1.register);
    router.post('/signin', user_controllers_1.signin);
    router.post('/logout', user_controllers_1.logout);
    return router;
}
//# sourceMappingURL=auth.js.map