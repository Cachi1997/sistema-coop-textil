import express from "express";
import cors from "cors";
//import weighingRoutes from "./routes/weighing.routes";
const app = express();

app.use(cors());
app.use(express.json());
//app.use("/api/weighings", weighingRoutes);

export default app;
