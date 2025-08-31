import denierServices from "../services/denierServices";
import { Request, Response } from "express";

export const getDeniers = async (req: Request, res: Response) => {
  try {
    const deniers = await denierServices.getAllDeniers();
    res.status(200).json(deniers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDenier = async (req: Request, res: Response) => {
  try {
    const { denier, key, coefficient } = req.body;
    const newDenier = await denierServices.createDenier(
      denier,
      key ?? null,
      coefficient ?? null
    );
    res.status(201).json(newDenier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
