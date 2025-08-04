import toneServices from "../services/toneServices";
import { Request, Response } from "express";

export const getTones = async (req: Request, res: Response) => {
  try {
    const tones = await toneServices.getAllTones();
    res.status(200).json(tones);
  } catch (error) {
    res.status(500).json({ message: `Error fetching tones: ${error.message}` });
  }
};
