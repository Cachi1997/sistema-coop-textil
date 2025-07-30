import denierServices from "../services/denierServices";
import { Request, Response } from "express";

export const getDeniers = async (req: Request, res: Response) => {
  try {
    const deniers = await denierServices.getAllDeniers();
    res.status(200).json(deniers);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching deniers: ${error.message}` });
  }
};
