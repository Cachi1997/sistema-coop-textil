import { Router } from "express";
import {
  getOrderForWeighing,
  createOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.get("/order/:id", getOrderById);
orderRouter.get("/orderWeight", getOrderForWeighing);
orderRouter.post("/order", createOrder);
orderRouter.put("/order/:id", updateOrder);

export default orderRouter;
