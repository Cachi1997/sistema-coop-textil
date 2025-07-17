import { Router } from "express";
import {
  getOrderForWeighing,
  createWeight,
} from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.get("/orderWeight", getOrderForWeighing);
orderRouter.post("/orderWeight", createWeight);

export default orderRouter;
