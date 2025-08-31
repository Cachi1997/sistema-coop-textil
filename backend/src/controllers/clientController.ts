import clientServices from "../services/clientServices";
import { Request, Response } from "express";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientServices.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newClient = await clientServices.createClient(name.toLowerCase());
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
