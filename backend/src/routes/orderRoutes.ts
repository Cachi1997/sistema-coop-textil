import { Router } from "express";
import { getOrderForWeighing } from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.get("/orderWeight", getOrderForWeighing);

export default orderRouter;
