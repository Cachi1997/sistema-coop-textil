import { Request, Response } from "express";
import materialReceiptsServices from "../services/materialReceiptsServices";
import { MaterialReceiptData } from "../types";

export const createMaterialReceipt = async (req: Request, res: Response) => {
  try {
    const data: MaterialReceiptData = req.body;
    const mReceipts = await materialReceiptsServices.createMaterialReceipt(
      data
    );
    res.status(201).json(mReceipts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMaterialReceiptsByTruck = async (
  req: Request,
  res: Response
) => {
  try {
    const { truck, clientId } = req.query;
    const mReceipts = await materialReceiptsServices.getMaterialReceiptsByTruck(
      truck.toString(),
      Number(clientId)
    );
    res.status(201).json(mReceipts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
