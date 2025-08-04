import colorServices from "../services/colorServices";
import { Request, Response } from "express";

export const getColors = async (req: Request, res: Response) => {
  try {
    const colors = await colorServices.getAllColors();
    res.status(200).json(colors);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching colors: ${error.message}` });
  }
};
