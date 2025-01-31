"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRoutes = inventoryRoutes;
const express_1 = __importDefault(require("express"));
const inventory_controller_1 = require("../controllers/inventory.controller");
const router = express_1.default.Router();
function inventoryRoutes() {
    console.log("inventory..");
    router.post("/inventory", inventory_controller_1.addInventory);
    router.put("/inventory/:id", inventory_controller_1.updateInventory);
    router.delete("/inventory/:id", inventory_controller_1.deleteInventory);
    router.get("/inventory/:id", inventory_controller_1.getInventoryById);
    router.get("/inventories", inventory_controller_1.getInventory);
    router.post("/add-stock", inventory_controller_1.increaseStock);
    router.post("/remove-stock", inventory_controller_1.removeStock);
    router.get("/low-stock", inventory_controller_1.lowStockAlert);
    router.get("/expired-items", inventory_controller_1.checkExpiredItems);
    router.get("/inventory-valuation", inventory_controller_1.inventoryValuation);
    return router;
}
//# sourceMappingURL=inventory.js.map