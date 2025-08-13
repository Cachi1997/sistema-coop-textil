import MaterialReceipt from "../models/MaterialReceipts";
import { MaterialReceiptData } from "../types";

const createMaterialReceipt = async (data: MaterialReceiptData) => {
  try {
    const newMReceipt = await MaterialReceipt.create({
      entryDate: data.entryDate,
      clientId: data.clientId,
      rawMaterial: data.rawMaterialId,
      truck: data.truck,
      batch: data.batch,
      baleNumber: data.baleNumber,
      baleKilos: data.kilos,
      batchNumber: data.batchNumber,
      colorId: data.colorId,
      colorName: data.color,
      product: data.product,
      denier: data.denier,
      totalDenier: data.denierTotal,
      luster: data.luster,
      merge: data.merge,
    });
    return newMReceipt;
  } catch (error) {
    console.error("Error al ingresar el material:", error);
    throw new Error(
      `Ocurrió un error al ingresar el material: ${error.message}`
    );
  }
};

export default {
  createMaterialReceipt,
};
