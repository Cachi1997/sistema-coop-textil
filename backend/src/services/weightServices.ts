import { Op } from "sequelize";
import Weighing from "../models/Weighing";
import { WeightData } from "../types";
import TypeWeight from "../models/TypeWeight";
import { getTodayCutoffDate } from "../utils/date.utils";
import { getCurrentBatchNumber } from "./batchServices";
import orderServices from "./orderServices";
import userServices from "./userServices";

/**
 * Crea un nuevo registro de pesaje en la base de datos.
 * @param weightData - Datos del pesaje a crear.
 * @returns El objeto Weighing creado.
 * @throws Error si ocurre un problema al crear el pesaje.
 */
const createWeight = async (weightData: WeightData) => {
  const dateNow = new Date().toISOString().split("T")[0];
  const timeNow = new Date().toTimeString().slice(0, 5);

  try {
    const orderId = await orderServices.getOrderId(
      weightData.ppe,
      weightData.batch
    );
    const typeWeightId = await getTypeWeightId(weightData.isYarn);
    const userId = await userServices.getUserIdByCode(weightData.user);
    const baleNumber = await getNextBaleNumber(weightData.isYarn);
    const batchNumber = await getCurrentBatchNumber();
    const newWeigth = await Weighing.create({
      date: dateNow,
      time: timeNow,
      grossWeight: weightData.grossWeight,
      netWeight: weightData.netWeight,
      batch: batchNumber,
      bale: baleNumber,
      internalTare: weightData.internalTare,
      externalTare: weightData.externalTare,
      typeWeightId,
      orderId,
      userId,
    });
    return newWeigth;
  } catch (error) {
    console.error("Error al crear el pesaje:", error);
    throw new Error("No se pudo crear el pesaje.");
  }
};

/**
 * Obtiene el siguiente número de fardo para el pesaje.
 * @param isYarn - Indica si es hilo (1) o top (0).
 * @returns El siguiente número de fardo.
 * @throws Error si ocurre un problema al obtener el número de fardo.
 */
const getNextBaleNumber = async (isYarn: number): Promise<number> => {
  // 1. Buscar el TypeWeight correspondiente

  const typeWeight = await TypeWeight.findOne({
    where: { type_number: isYarn },
  });

  if (!typeWeight) {
    throw new Error("Tipo de peso no encontrado");
  }

  const typeWeightId = typeWeight.id;
  const cutOffDate = getTodayCutoffDate();

  // 2. Buscar el último pesaje desde la hora de corte (6 AM)
  const lastWeighing = await Weighing.findOne({
    where: {
      createdAt: { [Op.gte]: cutOffDate },
      typeWeightId,
    },
    order: [["createdAt", "DESC"]],
  });

  // 3. Determinar el siguiente número de fardo
  let lastBaleNumber = isYarn === 1 ? 30 : 1;

  if (lastWeighing?.bale) {
    const lastBale = lastWeighing.bale;
    if (!isNaN(lastBale)) {
      lastBaleNumber = lastBale + 1;
    }
  }

  return lastBaleNumber;
};

/**
 * Obtiene el ID del tipo de peso basado en el número de tipo.
 * @param typeNumber - Número del tipo de peso.
 * @returns El ID del tipo de peso.
 * @throws Error si no se encuentra el tipo de peso.
 */
const getTypeWeightId = async (typeNumber: number): Promise<number> => {
  try {
    const typeWeight = await TypeWeight.findOne({
      where: { type_number: typeNumber },
      attributes: ["id"],
    });
    if (!typeWeight) {
      throw new Error("Tipo de peso no encontrado");
    }
    return typeWeight.id;
  } catch (error) {
    console.error("Error al buscar el Id del tipo de peso:", error);
    throw new Error("No fue posible devolver el id del tipo de peso.");
  }
};

export default {
  createWeight,
};
