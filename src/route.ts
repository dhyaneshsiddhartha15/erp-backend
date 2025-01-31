import { Application } from "express";
import { authRoutes } from "./routes/auth";
import { inventoryRoutes } from "./routes/inventory";
const AUTH_BASE_PATH='/api/v1/auth'
const INV_BASE_PATH='/api/v1/inventory'
export function appRoutes(app:Application):void{
  app.use(AUTH_BASE_PATH ,authRoutes());
  app.use(INV_BASE_PATH ,inventoryRoutes());
};