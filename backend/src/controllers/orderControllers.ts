import { Request, Response } from "express";
import orderServices from "../services/orderServices";

export const getOrderForWeighing = async (req: Request, res: Response) => {
  try {
    const { ppe, batch, isYarn } = req.query;
    const resp = orderServices.getOrderForWeighing(
      Number(ppe),
      Number(batch),
      Number(isYarn)
    );
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
};
