import { Router } from "express";
import {
  getOrderForWeighing,
  createOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
  completedOrder,
  deleteOrder,
} from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.get("/order/:id", getOrderById);
orderRouter.get("/orderWeight", getOrderForWeighing);
orderRouter.post("/order", createOrder);
orderRouter.put("/order/completed/:id/", completedOrder);
orderRouter.put("/order/:id", updateOrder);
orderRouter.delete("/order/:id", deleteOrder);

export default orderRouter;
