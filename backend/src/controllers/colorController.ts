import colorServices from "../services/colorServices";
import { Request, Response } from "express";

export const getColors = async (req: Request, res: Response) => {
  try {
    const colors = await colorServices.getAllColors();
    res.status(200).json(colors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createColor = async (req: Request, res: Response) => {
  try {
    const { idColor, colorName, originalColorName, clientId } = req.body;
    const colors = await colorServices.createColor(
      idColor,
      colorName,
      originalColorName ?? null,
      clientId !== undefined && clientId !== "" ? Number(clientId) : null
    );
    res.status(201).json(colors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
