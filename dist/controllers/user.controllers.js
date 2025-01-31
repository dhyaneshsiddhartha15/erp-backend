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
exports.register = register;
exports.signin = signin;
exports.logout = logout;
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup_1 = require("../schemas/signup");
const auth_service_1 = require("../services/auth.service");
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const signin_1 = require("../schemas/signin");
const error_handler_1 = require("../utils/error-handler");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("controller called");
            const { error } = yield Promise.resolve(signup_1.signupSchema.validate(req.body));
            if (error === null || error === void 0 ? void 0 : error.details) {
                console.log("error: " + error);
            }
            const { name, email, password, role } = req.body;
            const existingUser = yield (0, auth_service_1.getAuthUserByEmail)(email);
            if (existingUser) {
                throw new error_handler_1.BadRequestError('Invalid credentials', 'userController.signin');
            }
            console.log("Hashing password...");
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            console.log("Password hashed.");
            const newUser = yield auth_service_1.userService.create(name, email, hashPassword, role);
            console.log("Generating JWT...");
            const userJWT = (0, jwt_1.signToken)(newUser.id, newUser.email, newUser.name);
            console.log("JWT generated.");
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: 'User created successfully',
                user: newUser,
                token: userJWT
            });
        }
        catch (error) {
            console.log("Erro from register", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong',
                error: error instanceof Error ? error.message : error,
            });
        }
    });
}
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield Promise.resolve(signin_1.loginSchema.validate(req.body));
            if (error === null || error === void 0 ? void 0 : error.details) {
                console.log("Validation error:", error.details);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Validation error',
                    details: error.details,
                });
            }
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Please provide email and password',
                });
            }
            const user = yield (0, auth_service_1.getAuthUserByEmail)(email);
            if (!user) {
                throw new error_handler_1.BadRequestError('User not found', 'signin() method error');
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                throw new error_handler_1.BadRequestError('Invalid credentials', 'signin() method error');
            }
            const userjwt = (0, jwt_1.signToken)(user.id, user.email, user.name);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "User signed in successfully",
                user,
                token: userjwt,
            });
        }
        catch (error) {
            console.error("Error from signin:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong',
                error: error instanceof Error ? error.message : error,
            });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('token');
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
    });
}
//# sourceMappingURL=user.controllers.js.map