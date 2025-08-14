import MaterialReceipt from "../models/MaterialReceipts";
import RawMaterial from "../models/RawMaterial";
import { MaterialReceiptData } from "../types";

const createMaterialReceipt = async (data: MaterialReceiptData) => {
  try {
    const newMReceipt = await MaterialReceipt.create({
      entryDate: data.entryDate,
      clientId: data.clientId,
      rawMaterialId: data.rawMaterialId,
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

const getMaterialReceiptsByTruck = async (truck: string, clientId: number) => {
  try {
    const mReceipts = await MaterialReceipt.findAll({
      where: { truck, clientId, dispatched: false },
      attributes: [
        "id",
        "batch",
        "baleNumber",
        "baleKilos",
        "denier",
        "luster",
        "totalDenier",
        "dispatched",
      ],
      include: [{ model: RawMaterial, attributes: ["name"] }],
    });
    return mReceipts;
  } catch (error) {
    console.error("Error al buscar los fardos:", error);
    throw new Error("No fue posible obtener los fardos.");
  }
};

export default {
  createMaterialReceipt,
  getMaterialReceiptsByTruck,
};
