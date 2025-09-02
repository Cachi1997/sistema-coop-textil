import MaterialReceipt from "../models/MaterialReceipts";
import RawMaterial from "../models/RawMaterial";
import { MaterialReceiptData } from "../types";
import { Op } from "sequelize";
import { CustomError } from "../utils/CustomError";

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
    throw new CustomError(500, `Error al crear el remito: ${error.message}`);
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
    throw new CustomError(
      500,
      `Error al obtener los remitos: ${error.message}`
    );
  }
};

/**
 * Returns the total amount of kilos in the id's objects
 * @param ids Array de IDs de MaterialReceipt
 * @returns Total de kilos (number)
 */
const sumBaleKilosByIds = async (ids: (string | number)[]): Promise<number> => {
  const total = await MaterialReceipt.sum("baleKilos", {
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });

  return Number(total) || 0;
};

const updateDeliveryNoteFields = async (
  ids: number[],
  deliveryNoteNumber: number
) => {
  // Actualizamos en lote
  const [updatedCount] = await MaterialReceipt.update(
    {
      deliveryNoteNumber,
      dispatched: true,
    },
    {
      where: { id: ids },
    }
  );

  return updatedCount; // cantidad de registros actualizados
};

export default {
  createMaterialReceipt,
  getMaterialReceiptsByTruck,
  sumBaleKilosByIds,
  updateDeliveryNoteFields,
};
