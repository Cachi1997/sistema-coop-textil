import { Op } from "sequelize";
import Weighing from "../models/Weighing";
import { WeightData } from "../types";
import TypeWeight from "../models/TypeWeight";
import { getTodayCutoffDate } from "../utils/date.utils";
import { getCurrentBatchNumber } from "./batchServices";

const createWeight = async (weightData: WeightData) => {
  const dateNow = new Date().toISOString().split("T")[0];
  const timeNow = new Date().toTimeString().slice(0, 5);
  const baleNumber = getNextBaleNumber(weightData.isYarn);
  const batchNumber = getCurrentBatchNumber();

  const newWeigth = await Weighing.create({
    date: dateNow,
    time: timeNow,
    grossWeight: weightData.grossWeight,
    netWeight: weightData.netWeight,
    batch: 4,
    bale: baleNumber,
    internalTare: weightData.internalTare,
    externalTare: weightData.externalTare,
  });
};

export const getNextBaleNumber = async (isYarn: number): Promise<number> => {
  // 1. Buscar el TypeWeight correspondiente
  const typeWeight = await TypeWeight.findOne({
    where: { type_number: isYarn },
  });

  if (!typeWeight) {
    throw new Error("Tipo de peso no encontrado");
  }

  const typeWeightId = typeWeight.id;
  const fechaCorte = getTodayCutoffDate();

  // 2. Buscar el último pesaje desde la hora de corte (6 AM)
  const ultimoPesaje = await Weighing.findOne({
    where: {
      createdAt: { [Op.gte]: fechaCorte },
      typeWeightId,
    },
    order: [["createdAt", "DESC"]],
  });

  // 3. Determinar el siguiente número de fardo
  let proximoBaleNumber = isYarn === 1 ? 30 : 1;

  if (ultimoPesaje?.bale) {
    const ultimoBale = ultimoPesaje.bale;
    if (!isNaN(ultimoBale)) {
      proximoBaleNumber = ultimoBale + 1;
    }
  }

  return proximoBaleNumber;
};
