// app.ts
import express, { Application } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { connect } from "./config/database";
import { appRoutes } from "./route";

const app: Application = express();

// Security Middlewares
app.use(helmet());  // Adds various HTTP headers for security
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));   // Enable CORS

// Request Parsing
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Application Routes
appRoutes(app);

// Error Handling Middleware (should be last)
app.use(errorMiddleware);

// Database Connection
const initializeApp = async () => {
  try {
    await connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

initializeApp();

export default app;