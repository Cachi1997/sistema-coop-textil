import clientServices from "../services/clientServices";
import { Request, Response } from "express";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientServices.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching clients: ${error.message}` });
  }
};
