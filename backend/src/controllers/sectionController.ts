import { Request, Response } from "express";
import sectionServices from "../services/sectionServices";

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const sections = await sectionServices.getAllSections();
    res.status(201).json(sections);
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
};
