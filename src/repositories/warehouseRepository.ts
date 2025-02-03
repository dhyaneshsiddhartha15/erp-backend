import { IWarehouse } from "../interfaces/warehouse.interface";
import Warehouse from "../models/Warehouse";

export class WarehouseRepository {
    // Create a new warehouse entry
    async createWarehouse(data: IWarehouse) {
        return await Warehouse.create(data);
    }

    // Get all warehouses
    async getAllWarehouses() {
        return await Warehouse.find();
    }

    // Get a specific warehouse by ID
    async getWarehouseById(id: string) {
        return await Warehouse.findById(id);
    }

    // Update a warehouse by ID
    async updateWarehouse(id: string, data: Partial<IWarehouse>) {
        return await Warehouse.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    // Delete a warehouse by ID
    async deleteWarehouse(id: string) {
        return await Warehouse.findByIdAndDelete(id);
    }
}
