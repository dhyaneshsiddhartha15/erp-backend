"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = appRoutes;
const auth_1 = require("./routes/auth");
const inventory_1 = require("./routes/inventory");
const AUTH_BASE_PATH = '/api/v1/auth';
const INV_BASE_PATH = '/api/v1/inventory';
function appRoutes(app) {
    app.use(AUTH_BASE_PATH, (0, auth_1.authRoutes)());
    app.use(INV_BASE_PATH, (0, inventory_1.inventoryRoutes)());
}
;
//# sourceMappingURL=route.js.map