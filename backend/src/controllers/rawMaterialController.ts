import rawMaterialServices from "../services/rawMaterialServices";
import rawMaterial from "../services/rawMaterialServices";
import { Request, Response } from "express";

export const getRawMaterials = async (req: Request, res: Response) => {
  try {
    const rawMaterials = await rawMaterial.getAllRawMaterials();
    res.status(200).json(rawMaterials);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const createRawMaterial = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newRawMaterial = await rawMaterialServices.createRawMaterial(
      name.toLowerCase()
    );
    res.status(201).json(newRawMaterial);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};
