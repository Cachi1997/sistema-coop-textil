import ppeServices from "../services/ppeServices";
import { Request, Response } from "express";

export const getLastPPE = async (req: Request, res: Response) => {
  try {
    const ppe = await ppeServices.getLastPPE();
    res.status(200).json(ppe);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};
