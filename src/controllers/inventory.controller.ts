import { inventorySchema } from "../schemas/inventorySchema";
import { Request, Response } from "express";
import { InventoryService } from "../services/inventory.service";
import { StatusCodes } from "http-status-codes";
import { IInventory } from "../interfaces/inventory.interface"; 

const inventoryService = new InventoryService();

export async function addInventory(req: Request, res: Response): Promise<void> {
    try {
        const { error } = await Promise.resolve(inventorySchema.validate(req.body));
        if (error) {
           res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation error",
                details: error.details.map(detail => detail.message),
            });
        }

        const newInventory: IInventory | null = await inventoryService.addInventory(req.body);
       res.status(StatusCodes.CREATED).json({
            message: "Inventory added successfully",
            inventory: newInventory,
        });

    } catch (error) {
        console.error("Error adding inventory:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add inventory",
            error: (error as Error).message,
        });
    }
}

export async function updateInventory(req: Request, res: Response): Promise<void> {
    try {
        const inventoryId = req.params.id;
        const updatedData = req.body;

        const { error } = await Promise.resolve(inventorySchema.validate(updatedData));
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation error",
                details: error.details.map(detail => detail.message),
            });
        }

        const updatedInventory: IInventory | null = await inventoryService.modifyInventory(inventoryId, updatedData);

        if (!updatedInventory) {
        res.status(StatusCodes.NOT_FOUND).json({
                message: "Inventory not found",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Inventory updated successfully",
            inventory: updatedInventory,
        });

    } catch (error) {
        console.error("Error updating inventory:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update inventory",
            error: (error as Error).message,
        });
    }
}

export async function deleteInventory(req: Request, res: Response): Promise<void> {
    try {
        const inventoryId = req.params.id;
        const deletedInventory = await inventoryService.removeInventory(inventoryId);

        if (!deletedInventory) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Inventory not found",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Inventory deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting inventory:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete inventory",
            error: (error as Error).message,
        });
    }
}

export async function getInventory(req: Request, res: Response): Promise<void> {
    try {
        const inventories = await inventoryService.listInventories();
        res.status(StatusCodes.OK).json({
            message: "Inventories retrieved successfully",
            inventories,
        });

    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: (error as Error).message,
        });
    }
}

export async function getInventoryById(req: Request, res: Response): Promise<void> {
    try {
        const inventoryId = req.params.id;
        const inventory = await inventoryService.getInventory(inventoryId);

        if (!inventory) {
        res.status(StatusCodes.NOT_FOUND).json({
                message: "Inventory not found",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Inventory retrieved successfully",
            inventory,
        });

    } catch (error) {
        console.error("Error fetching inventory by ID:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventory",
            error: (error as Error).message,
        });
    }
}

export async function increaseStock(req: Request, res: Response): Promise<void> {
    try {
        const { inventoryId, quantity } = req.body;
        
        const inventoryService = new InventoryService();
        const updatedInventory = await inventoryService.addStock(inventoryId, quantity);

        res.status(StatusCodes.OK).json({
            message: "Successfully added",
            updatedInventory, 
        });
    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: (error as Error).message,
        });
    }
}


export const removeStock = async (req: Request, res: Response) => {
    try {
      const { inventoryId, quantity } = req.body;
      const updatedInventory = await inventoryService.removeStock(inventoryId, quantity);
      res.status(200).json(updatedInventory);
    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: (error as Error).message,
        });
    }
  };

  export const lowStockAlert = async (req: Request, res: Response) => {
    try {
      const lowStockItems = await inventoryService.getLowStockAlert();
      res.status(200).json(lowStockItems);
    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: (error as Error).message,
        });
    }
  };
  
 
  export const checkExpiredItems = async (req: Request, res: Response) => {
    try {
      const expiredItems = await inventoryService.checkExpiry();
      res.status(200).json(expiredItems);
    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: (error as Error).message,
        });
    }
  };
  
  export const inventoryValuation = async (req: Request, res: Response) => {
    try {
      const totalValue = await inventoryService.calculateInventoryValuation();
      res.status(200).json({ totalValue });
    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch inventories",
            error: (error as Error).message,
        });
    }
  };

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
