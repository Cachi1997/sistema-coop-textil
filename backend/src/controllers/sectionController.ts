import { Request, Response } from "express";
import sectionServices from "../services/sectionServices";
import toneServices from "../services/toneServices";

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const sections = await sectionServices.getAllSections();
    res.status(200).json(sections);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const createSection = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newSection = await toneServices.createTone(name.toLowerCase());
    res.status(201).json(newSection);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};
