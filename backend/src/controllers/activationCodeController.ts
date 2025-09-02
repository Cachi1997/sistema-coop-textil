import { Request, Response } from "express";
import activationServices from "../services/activationServices";

export const createActivationCode = async (req: Request, res: Response) => {
  try {
    const { code, type } = req.body;
    const newCode = await activationServices.createActivationCode(code, type);
    res.status(201).json(newCode);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const verifyActivationCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const foundCode = await activationServices.verifyActivationCode(code);
    if (foundCode) {
      res.status(200).json(foundCode);
    } else {
      res.status(404).json({ message: "Codigo de activación no encontrado" });
    }
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};
