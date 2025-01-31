import { InventoryRepository } from "../repositories/inventoryRepository";
import { IInventory } from "../interfaces/inventory.interface";
export class InventoryService{
    private inventoryRepo=new InventoryRepository();
    async addInventory(data: IInventory) {
        return await this.inventoryRepo.createInventory(data);
    }

    async listInventories(){
        return await this.inventoryRepo.getAllInventories();
    }

    async getInventory(id:string){
        return await this.inventoryRepo.getInventoryById(id);
    }

    async modifyInventory(id:string,data:Partial <IInventory>){
        return await this.inventoryRepo.updateInventory(id,data);
    }

    async removeInventory(id: string) {
        return await this.inventoryRepo.deleteInventory(id);
    }
    async addStock(id:string,quantity:number){
        return await this.inventoryRepo.increaseStock(id,quantity);
    }
    async removeStock(id:string,quantity:number){
        return await this.inventoryRepo.decreaseStock(id,quantity);

    }
    async getLowStockAlert(){
        return await this.inventoryRepo.getlowStock();
    }
    async checkExpiry(){
        return await this.inventoryRepo.getExpiredInventory();
    }
    async calculateInventoryValuation(){
        return await this.inventoryRepo.calculateInventoryValuation();
    }
}