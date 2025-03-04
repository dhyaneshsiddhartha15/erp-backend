import { Application } from "express";
import { authRoutes } from "./routes/auth";
import { inventoryRoutes } from "./routes/inventory";
import { warehouseRoutes } from "./routes/warehouse";
import { productRoutes } from "./routes/product";
const AUTH_BASE_PATH='/api/v1/auth'
const INV_BASE_PATH='/api/v1/inventory'
const WH_BASE_PATH='/api/v1/warehouse'
const PR_BASE_PATH='/api/v1/products'
export function appRoutes(app:Application):void{
  app.use(AUTH_BASE_PATH ,authRoutes());
  app.use(INV_BASE_PATH ,inventoryRoutes());
  app.use(WH_BASE_PATH ,warehouseRoutes());
  app.use(PR_BASE_PATH,productRoutes());
};