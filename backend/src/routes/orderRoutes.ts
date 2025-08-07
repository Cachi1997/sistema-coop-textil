import { Router } from "express";
import {
  getOrderForWeighing,
  createOrder,
  updateOrder,
} from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.get("/orderWeight", getOrderForWeighing);
orderRouter.post("/order", createOrder);
orderRouter.put("/order/:id", updateOrder);

export default orderRouter;
