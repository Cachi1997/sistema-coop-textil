import rawMaterial from "../services/rawMaterial";
import { Request, Response } from "express";

export const getRawMaterials = async (req: Request, res: Response) => {
  try {
    const rawMaterials = await rawMaterial.getAllRawMaterials();
    res.status(200).json(rawMaterials);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching raw materials: ${error.message}` });
  }
};
