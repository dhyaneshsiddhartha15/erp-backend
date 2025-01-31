import winston from "winston";

// Define log levels and their severity
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const level = () => {
  return process.env.NODE_ENV === "development" ? "debug" : "info";
};

// Log format configuration
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message, stack }) =>
      `${timestamp} [${level}]: ${stack || message}`
  )
);

// File transport options
const fileTransport = new winston.transports.File({
  filename: "logs/error.log",
  level: "error",
});

// Console transport options
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(), // Add color to console logs
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
});

// Create logger instance
export const logger = winston.createLogger({
  level: level(),
  levels: logLevels,
  format: logFormat,
  transports: [
    fileTransport, // Logs errors to a file
    consoleTransport, // Logs to console
  ],
});

// If we're not in production, log stack traces for errors
if (process.env.NODE_ENV !== "production") {
  logger.exceptions.handle(
    new winston.transports.File({ filename: "logs/exceptions.log" })
  );
}
