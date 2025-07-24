import { Request, Response } from "express";
import orderServices from "../services/orderServices";

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
