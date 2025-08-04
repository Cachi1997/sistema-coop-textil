import { Router } from "express";
import {
  getOrderForWeighing,
  createOrder,
} from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.get("/orderWeight", getOrderForWeighing);
orderRouter.post("/order", createOrder);

export default orderRouter;
