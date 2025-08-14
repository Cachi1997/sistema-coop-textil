import { Router } from "express";
import {
  createMaterialReceipt,
  getMaterialReceiptsByTruck,
} from "../controllers/mReceiptsController";

const materialRouter = Router();

materialRouter.post("/material", createMaterialReceipt);
materialRouter.get("/materialReceipt", getMaterialReceiptsByTruck);

export default materialRouter;
