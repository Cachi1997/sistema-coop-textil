import express from "express";
import cors from "cors";
import colors from "colors";
import db from "./config/db";
import userRouter from "./routes/userRoutes";
import orderRouter from "./routes/orderRoutes";
import weighingRouter from "./routes/weighingRoutes";
import utilityRouter from "./routes/utilityRoutes";
import materialRouter from "./routes/materialRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/weighings", weighingRouter);
app.use("/api/utilities", utilityRouter);
app.use("/api/materials", materialRouter);

// Middleware de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const connectDB = async () => {
  try {
    await db.authenticate();
    // await db.sync(); // Solo si necesitás sincronizar tablas
    console.log(colors.bgGreen.bold.italic("Database connected successfully"));
  } catch (error) {
    console.log(colors.red.bold("Unable to connect to the database:"));
    console.error(colors.red.bold(error));
    throw error; // importante para que el server no continúe si falla
  }
};

export { app as default, connectDB };
