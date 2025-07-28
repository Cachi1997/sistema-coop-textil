import { TicketData, WeightData } from "../types";
import { Request, Response } from "express";
import weightServices from "../services/weightServices";
import orderServices from "../services/orderServices";
import Weighing from "../models/Weighing";
import pdfPrinterServices from "../services/pdfPrinterServices";

export const createWeight = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const weight: WeightData = req.body;
    const newWeight = await weightServices.createWeight(weight);
    if (!newWeight) {
      res.status(400).json({ message: "Error al crear el peso" });
      return;
    }
    await saveWeightInOrder(newWeight.orderId, weight.netWeight);
    await imprimirEtiqueta(newWeight, weight.ppe, weight.batch, weight.isYarn);
    res.status(201).json(newWeight);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveWeightInOrder = async (
  orderId: number,
  netWeight: number
): Promise<void> => {
  try {
    await orderServices.updateKilosProcesed(orderId, netWeight);
  } catch (error) {
    console.error("Error al actualizar kilos procesados:", error);
    throw new Error("No fue posible actualizar los kilos procesados.");
  }
};

const imprimirEtiqueta = async (
  weight: Weighing,
  ppe: number,
  batch: number,
  isYarn: number
): Promise<void> => {
  try {
    const order = await orderServices.getOrderForWeighing(ppe, batch, isYarn);
    const pdfData: TicketData = {
      product: order.dataValues.product.dataValues.name.toUpperCase(),
      denier: order.dataValues.denier.denier,
      tone: order.dataValues.tone.name.toUpperCase(),
      rawMaterial: order.dataValues.rawMaterial.name.toUpperCase(),
      colorId: order.dataValues.color.dataValues.idColor,
      ppe: order.ppe,
      orderNumber: order.orderNumber,
      colorName: order.dataValues.color.dataValues.colorName.toUpperCase(),
      client: order.dataValues.client.name.toUpperCase(),
      batchNumber: order.batchNumber,
      batch: Number(weight.batch),
      bale: weight.bale,
      netWeight: weight.netWeight,
    };
    await pdfPrinterServices.generarPDF(pdfData);
    await pdfPrinterServices.imprimirPDF();
  } catch (error) {
    console.error("❌ Error al imprimir etiqueta:", error);
  }
};
