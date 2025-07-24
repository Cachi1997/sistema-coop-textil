import express from "express";
import cors from "cors";
import db from "./config/db";
import colors from "colors";
import userRouter from "./routes/userRoutes";
import orderRouter from "./routes/orderRoutes";
import weighingRouter from "./routes/weighingRoutes";

const app = express();

app.use(cors());
app.use(express.json());
//app.use("/api/weighings", weighingRoutes);

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/weighings", weighingRouter);

const connectDB = async () => {
  try {
    await db.authenticate();
    //await db.sync();
    console.log(colors.bgGreen.bold.italic("Database connected successfully"));
  } catch (error) {
    console.log(colors.red.bold("Unable to connect to the database:"));
    console.error(colors.red.bold(error));
  }
};

connectDB();

export default app;
