import { Request, Response } from "express";
import deliveryNoteServices from "../services/deliveryNoteServices";

export const generateDeliveryNote = async (req: Request, res: Response) => {
  try {
    const { ids, truck, clientId, section } = req.body;

    const newDeliveryNote = await deliveryNoteServices.generateDeliveryNote(
      ids,
      truck,
      clientId,
      section
    );

    res.status(201).json(newDeliveryNote);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};
