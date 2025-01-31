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
// app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const database_1 = require("./config/database");
const route_1 = require("./route");
const app = (0, express_1.default)();
// Security Middlewares
app.use((0, helmet_1.default)()); // Adds various HTTP headers for security
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
})); // Enable CORS
// Request Parsing
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
// Logging
if (process.env.NODE_ENV !== 'production') {
    app.use((0, morgan_1.default)('dev'));
}
// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});
// Application Routes
(0, route_1.appRoutes)(app);
// Error Handling Middleware (should be last)
app.use(errorMiddleware_1.errorMiddleware);
// Database Connection
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connect)();
        console.log('✅ Database connected successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
});
initializeApp();
exports.default = app;
//# sourceMappingURL=app.js.map