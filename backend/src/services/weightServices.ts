import { Op, fn, col } from "sequelize";
import Weighing from "../models/Weighing";
import { WeightData } from "../types";
import TypeWeight from "../models/TypeWeight";
import { getTodayCutoffDate } from "../utils/date.utils";
import { getCurrentBatchNumber } from "./batchServices";
import orderServices from "./orderServices";
import userServices from "./userServices";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import Order from "../models/Order";
import Product from "../models/Product";
import Client from "../models/Client";
import Color from "../models/Color";
import { Denier } from "../models/Denier";
import Tone from "../models/Tone";
import RawMaterial from "../models/RawMaterial";

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

/**
 * Obtiene un pesaje por el ID de la orden.
 * @param orderId - ID de la orden.
 * @returns El objeto Weighing correspondiente a la orden.
 * @throws Error si ocurre un problema al obtener el pesaje.
 */
const getWeighingByOrderId = async (orderId: number) => {
  try {
    const weighing = await Weighing.findOne({
      where: { orderId },
    });
    return weighing;
  } catch (error) {
    console.error("Error al obtener el pesaje por ID de orden:", error);
    throw new Error("No fue posible obtener el pesaje por ID de orden.");
  }
};

/**
 *
 * @returns La suma total del peso neto semanal.
 * @throws Error si ocurre un problema al calcular la suma.
 */
const getWeeklyNetWeightSum = async (): Promise<number> => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Lunes
  const end = endOfWeek(new Date(), { weekStartsOn: 1 }); // Domingo

  const result = await Weighing.findOne({
    attributes: [[fn("SUM", col("netWeight")), "total"]],
    where: {
      date: {
        [Op.between]: [start, end],
      },
    },
    raw: true,
  });

  return parseFloat((result as any)?.total || "0");
};

/**
 * Obtiene la suma total del peso neto mensual.
 * @returns La suma total del peso neto mensual.
 * @throws Error si ocurre un problema al calcular la suma.
 */
const getMonthlyNetWeightSum = async (): Promise<number> => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const result = await Weighing.findOne({
    attributes: [[fn("SUM", col("netWeight")), "total"]],
    where: {
      date: {
        [Op.between]: [start, end],
      },
    },
    raw: true,
  });

  return parseFloat((result as any)?.total || "0");
};

const getWeighingByBatch = async (batch: number) => {
  try {
    const weighings = await Weighing.findAll({
      where: { batch },
      attributes: ["id", "date", "time", "netWeight", "batch", "bale"],
      include: [
        {
          model: Order,
          required: true,
          attributes: ["id", "ppe", "orderNumber", "batchNumber"],
          include: [
            {
              model: Product,
              attributes: ["name"],
            },
            {
              model: Client,
              attributes: ["name"],
            },
            {
              model: Color,
              attributes: ["idColor", "colorName"],
            },
            {
              model: Denier,
              attributes: ["denier"],
            },
            {
              model: Tone,
              attributes: ["name"],
            },
            {
              model: RawMaterial,
              attributes: ["name"],
            },
          ],
        },
      ],
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });
    return weighings;
  } catch (error) {
    console.error("Error al buscar pesajes entre fechas:", error);
    throw error;
  }
};

const getWeighingsBetweenDates = async (startDate: string, endDate: string) => {
  try {
    const weighings = await Weighing.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ["id", "date", "time", "netWeight", "batch", "bale"],
      include: [
        {
          model: Order,
          required: true,
          attributes: ["id", "ppe", "orderNumber", "batchNumber"],
          include: [
            {
              model: Product,
              attributes: ["name"],
            },
            {
              model: Client,
              attributes: ["name"],
            },
            {
              model: Color,
              attributes: ["idColor", "colorName"],
            },
            {
              model: Denier,
              attributes: ["denier"],
            },
            {
              model: Tone,
              attributes: ["name"],
            },
            {
              model: RawMaterial,
              attributes: ["name"],
            },
          ],
        },
      ],

      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });

    return weighings;
  } catch (error) {
    console.error("Error al buscar pesajes entre fechas:", error);
    throw error;
  }
};

export default {
  createWeight,
  getWeighingByOrderId,
  getWeeklyNetWeightSum,
  getMonthlyNetWeightSum,
  getWeighingsBetweenDates,
  getWeighingByBatch,
};
