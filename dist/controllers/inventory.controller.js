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
exports.inventoryValuation = exports.checkExpiredItems = exports.lowStockAlert = exports.removeStock = void 0;
exports.addInventory = addInventory;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
exports.getInventory = getInventory;
exports.getInventoryById = getInventoryById;
exports.increaseStock = increaseStock;
const inventorySchema_1 = require("../schemas/inventorySchema");
const inventory_service_1 = require("../services/inventory.service");
const http_status_codes_1 = require("http-status-codes");
const inventoryService = new inventory_service_1.InventoryService();
function addInventory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield Promise.resolve(inventorySchema_1.inventorySchema.validate(req.body));
            if (error) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Validation error",
                    details: error.details.map(detail => detail.message),
                });
            }
            const newInventory = yield inventoryService.addInventory(req.body);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: "Inventory added successfully",
                inventory: newInventory,
            });
        }
        catch (error) {
            console.error("Error adding inventory:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to add inventory",
                error: error.message,
            });
        }
    });
}
function updateInventory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventoryId = req.params.id;
            const updatedData = req.body;
            const { error } = yield Promise.resolve(inventorySchema_1.inventorySchema.validate(updatedData));
            if (error) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Validation error",
                    details: error.details.map(detail => detail.message),
                });
            }
            const updatedInventory = yield inventoryService.modifyInventory(inventoryId, updatedData);
            if (!updatedInventory) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Inventory not found",
                });
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Inventory updated successfully",
                inventory: updatedInventory,
            });
        }
        catch (error) {
            console.error("Error updating inventory:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update inventory",
                error: error.message,
            });
        }
    });
}
function deleteInventory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventoryId = req.params.id;
            const deletedInventory = yield inventoryService.removeInventory(inventoryId);
            if (!deletedInventory) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Inventory not found",
                });
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Inventory deleted successfully",
            });
        }
        catch (error) {
            console.error("Error deleting inventory:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete inventory",
                error: error.message,
            });
        }
    });
}
function getInventory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventories = yield inventoryService.listInventories();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Inventories retrieved successfully",
                inventories,
            });
        }
        catch (error) {
            console.error("Error fetching inventories:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to fetch inventories",
                error: error.message,
            });
        }
    });
}
function getInventoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventoryId = req.params.id;
            const inventory = yield inventoryService.getInventory(inventoryId);
            if (!inventory) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Inventory not found",
                });
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Inventory retrieved successfully",
                inventory,
            });
        }
        catch (error) {
            console.error("Error fetching inventory by ID:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to fetch inventory",
                error: error.message,
            });
        }
    });
}
function increaseStock(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { inventoryId, quantity } = req.body;
            const inventoryService = new inventory_service_1.InventoryService();
            const updatedInventory = yield inventoryService.addStock(inventoryId, quantity);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Successfully added",
                updatedInventory,
            });
        }
        catch (error) {
            console.error("Error fetching inventories:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to fetch inventories",
                error: error.message,
            });
        }
    });
}
const removeStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inventoryId, quantity } = req.body;
        const updatedInventory = yield inventoryService.removeStock(inventoryId, quantity);
        res.status(200).json(updatedInventory);
    }
    catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: error.message,
        });
    }
});
exports.removeStock = removeStock;
const lowStockAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lowStockItems = yield inventoryService.getLowStockAlert();
        res.status(200).json(lowStockItems);
    }
    catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: error.message,
        });
    }
});
exports.lowStockAlert = lowStockAlert;
const checkExpiredItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expiredItems = yield inventoryService.checkExpiry();
        res.status(200).json(expiredItems);
    }
    catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: error.message,
        });
    }
});
exports.checkExpiredItems = checkExpiredItems;
const inventoryValuation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalValue = yield inventoryService.calculateInventoryValuation();
        res.status(200).json({ totalValue });
    }
    catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: error.message,
        });
    }
});
exports.inventoryValuation = inventoryValuation;
// export async function listAllInventories(req: Request, res: Response): Promise<void> {
//     try {
//         const inventories = await inventoryService.listAllInventories();
//         res.status(StatusCodes.OK).json({
//             message: "All inventories listed successfully",
//             inventories,
//         });
//     } catch (error) {
//         console.error("Error listing inventories:", error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             message: "Failed to list inventories",
//             error: (error as Error).message,
//         });
//     }
// }
//# sourceMappingURL=inventory.controller.js.map