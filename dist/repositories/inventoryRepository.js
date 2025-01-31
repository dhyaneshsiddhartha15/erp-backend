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
exports.InventoryRepository = void 0;
const Inventory_1 = __importDefault(require("../models/Inventory"));
class InventoryRepository {
    createInventory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.create(data);
        });
    }
    getAllInventories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.find();
        });
    }
    getInventoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.findById(id);
        });
    }
    updateInventory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
        });
    }
    deleteInventory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.findByIdAndDelete(id);
        });
    }
    increaseStock(inventoryId, stockIn) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.findByIdAndUpdate(inventoryId, {
                $inc: {
                    currentStock: stockIn
                }
            });
        });
    }
    decreaseStock(inventoryId, stockIn) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.findByIdAndUpdate(inventoryId, {
                $inc: {
                    currentStock: -stockIn
                }
            });
        });
    }
    getlowStock() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.find({
                currentStock: { $lt: "$threshold" }
            });
        });
    }
    getExpiredInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.find({
                expiryDate: { $lt: new Date() }
            });
        });
    }
    calculateInventoryValuation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Inventory_1.default.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'produt',
                        foreignField: '_id',
                        as: 'product'
                    }
                }, {
                    $unwind: {
                        path: "$productInfo",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        productName: "$productInfo.name",
                        stockIn: "$stockIn",
                        stockOut: "$stockOut",
                        currentStock: "$currentStock",
                        constPrice: "$constPrice",
                        totalValue: {
                            $cond: {
                                if: { $and: [{ $ne: ["$currentStock", null] }, { $ne: ["$costPrice", null] }] },
                                then: { $multiply: ["$currentStock", "$costPrice"] },
                                else: 0
                            }
                        }
                    }
                }, {
                    $group: {
                        _id: null,
                        totalValue: { $sum: "$totalValue" }
                    }
                }
            ]);
        });
    }
}
exports.InventoryRepository = InventoryRepository;
//# sourceMappingURL=inventoryRepository.js.map