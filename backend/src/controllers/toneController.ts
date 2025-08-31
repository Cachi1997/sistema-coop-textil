import toneServices from "../services/toneServices";
import { Request, Response } from "express";

export const getTones = async (req: Request, res: Response) => {
  try {
    const tones = await toneServices.getAllTones();
    res.status(200).json(tones);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTone = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newTone = await toneServices.createTone(
      name.toLowerCase(),
      description
    );
    res.status(201).json(newTone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
