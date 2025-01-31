import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

interface CustomError extends Error {
  statusCode?: number;
  message: string;
}
const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log("error: " + message)
  logger.error(`${message} - ${req.method} ${req.url} - ${err.stack || ""}`);
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
    },
  });
};

export { errorMiddleware };
