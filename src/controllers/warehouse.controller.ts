import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { WarehouseService } from "../services/warehouse.service";
import { IWarehouse } from "../interfaces/warehouse.interface";

const warehouseService = new WarehouseService();

export async function addWarehouse(req: Request, res: Response): Promise<void> {
    try {
        const warehouseData: IWarehouse = req.body;
        const newWarehouse = await warehouseService.createWarehouse(warehouseData);

        res.status(StatusCodes.CREATED).json({
            message: "Warehouse created successfully",
            warehouse: newWarehouse,
        });
    } catch (error) {
        console.error("Error adding warehouse:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add warehouse",
            error: (error as Error).message,
        });
    }
}

export async function updateWarehouse(req: Request, res: Response): Promise<void> {
    try {
        const warehouseId = req.params.id;
        const updatedData: Partial<IWarehouse> = req.body;

        const updatedWarehouse = await warehouseService.updateWarehouse(warehouseId, updatedData);

        if (!updatedWarehouse) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Warehouse not found",
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            message: "Warehouse updated successfully",
            warehouse: updatedWarehouse,
        });
    } catch (error) {
        console.error("Error updating warehouse:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update warehouse",
            error: (error as Error).message,
        });
    }
}

export async function deleteWarehouse(req: Request, res: Response): Promise<void> {
    try {
        const warehouseId = req.params.id;

        const deletedWarehouse = await warehouseService.deleteWarehouse(warehouseId);

        if (!deletedWarehouse) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Warehouse not found",
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            message: "Warehouse deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting warehouse:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete warehouse",
            error: (error as Error).message,
        });
    }
}

export async function getWarehouseById(req: Request, res: Response): Promise<void> {
    try {
        const warehouseId = req.params.id;
        const warehouse = await warehouseService.getWarehouseById(warehouseId);

        if (!warehouse) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Warehouse not found",
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            message: "Warehouse retrieved successfully",
            warehouse,
        });
    } catch (error) {
        console.error("Error fetching warehouse:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch warehouse",
            error: (error as Error).message,
        });
    }
}

export async function listWarehouses(req: Request, res: Response): Promise<void> {
    try {
        const warehouses = await warehouseService.getAllWarehouses();

        res.status(StatusCodes.OK).json({
            message: "Warehouses retrieved successfully",
            warehouses,
        });
    } catch (error) {
        console.error("Error fetching warehouses:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch warehouses",
            error: (error as Error).message,
        });
    }
}
