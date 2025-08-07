import { Request, Response } from "express";
import orderServices from "../services/orderServices";
import { OrderData } from "../types";

export const getOrderForWeighing = async (req: Request, res: Response) => {
  try {
    const { ppe, batch, isYarn } = req.query;

    const resp = await orderServices.getOrderForWeighing(
      Number(ppe),
      Number(batch),
      Number(isYarn)
    );
    res.status(201).json(resp);
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order: OrderData = req.body;
    console.log("Creating order:", order);
    const newOrder = await orderServices.createOrder(order);
    res.status(201).json(newOrder);
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const idOrder = Number(req.params.id);
    const order: OrderData = req.body;
    const updatedOrder = await orderServices.updateOrder(idOrder, order);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
};
