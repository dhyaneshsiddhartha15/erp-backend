import { IInventory } from "../interfaces/inventory.interface";
import Inventory from "../models/Inventory";

export class InventoryRepository{
    async createInventory(data:IInventory){
        return await Inventory.create(data);
    }
    async getAllInventories(){
        return await Inventory.find();
    }
    async getInventoryById(id:string){
        return await Inventory.findById(id);

    }
    async updateInventory(id:string, data:Partial <IInventory>){
        return await Inventory.findByIdAndUpdate(id,data,{
            new: true,
            runValidators: true,
        })
    }
    async deleteInventory(id:string){
        return await Inventory.findByIdAndDelete(id)
    }
    async increaseStock(inventoryId:string,stockIn:number){
        return await Inventory.findByIdAndUpdate(inventoryId,{
            $inc:{
                currentStock: stockIn
            }
        })
    }
    async decreaseStock(inventoryId:string,stockIn:number){
     return await Inventory.findByIdAndUpdate(inventoryId,{
         $inc:{
             currentStock: -stockIn
         }
     })
    }
    async getlowStock(){
    return await Inventory.find({
        currentStock:{ $lt:"$threshold"}
    })
    }

    async getExpiredInventory(){
return await Inventory.find({
    expiryDate:{$lt:new Date()}
});
    }
    async calculateInventoryValuation(){
       return await Inventory.aggregate([
        {
$lookup:{
    from:'products',
    localField:'produt',
    foreignField:'_id',
    as:'product'
}
    },{
        $unwind: {
            path: "$productInfo",
            preserveNullAndEmptyArrays: true 
        }
        },
        {
$project:{
    productName:"$productInfo.name",
    stockIn:"$stockIn",
    stockOut:"$stockOut",
    currentStock:"$currentStock",
    constPrice:"$constPrice",
    totalValue:{
        $cond:{
            if: { $and: [{ $ne: ["$currentStock", null] }, { $ne: ["$costPrice", null] }] },
            then:{$multiply:["$currentStock", "$costPrice"]},
            else:0
        }
    }
}
        },{
            $group:{
                _id:null,
                totalValue:{$sum:"$totalValue"}
            }
        }
       ])
    }

}