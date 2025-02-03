import { WarehouseRepository } from "../repositories/warehouseRepository";
import { IWarehouse } from "../interfaces/warehouse.interface";

export class WarehouseService {
    private warehouseRepo = new WarehouseRepository();

    async createWarehouse(data: IWarehouse) {
        return await this.warehouseRepo.createWarehouse(data);
    }

    async getAllWarehouses() {
        return await this.warehouseRepo.getAllWarehouses();
    }

    async getWarehouseById(id: string) {
        return await this.warehouseRepo.getWarehouseById(id);
    }

    async updateWarehouse(id: string, data: Partial<IWarehouse>) {
        return await this.warehouseRepo.updateWarehouse(id, data);
    }

    async deleteWarehouse(id: string) {
        return await this.warehouseRepo.deleteWarehouse(id);
    }
}
