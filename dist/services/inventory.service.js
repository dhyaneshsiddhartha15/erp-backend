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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const inventoryRepository_1 = require("../repositories/inventoryRepository");
class InventoryService {
    constructor() {
        this.inventoryRepo = new inventoryRepository_1.InventoryRepository();
    }
    addInventory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.createInventory(data);
        });
    }
    listInventories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.getAllInventories();
        });
    }
    getInventory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.getInventoryById(id);
        });
    }
    modifyInventory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.updateInventory(id, data);
        });
    }
    removeInventory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.deleteInventory(id);
        });
    }
    addStock(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.increaseStock(id, quantity);
        });
    }
    removeStock(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.decreaseStock(id, quantity);
        });
    }
    getLowStockAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.getlowStock();
        });
    }
    checkExpiry() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.getExpiredInventory();
        });
    }
    calculateInventoryValuation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepo.calculateInventoryValuation();
        });
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map