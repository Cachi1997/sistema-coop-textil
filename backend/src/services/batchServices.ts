import Batch from "../models/Batch";
import { getTodayDate, getTodayCutoffDate } from "../utils/date.utils";

export const generateDailyBatch = async () => {
  const hoy = new Date();
  const diaSemana = hoy.getDay();

  if (diaSemana === 0) return null; // No se genera lote en domingo

  const fechaHoy = getTodayDate(); // ← Usas la función reutilizable

  const loteExistente = await Batch.findOne({ where: { date: fechaHoy } });

  if (loteExistente) {
    return loteExistente;
  }

  const ultimoLote = await Batch.findOne({
    order: [["batchNumber", "DESC"]],
  });

  const nuevoNumeroLote = ultimoLote ? ultimoLote.batchNumber + 1 : 4001;

  const nuevoLote = await Batch.create({
    batchNumber: nuevoNumeroLote,
    date: fechaHoy,
    isYarn: false,
  });

  return nuevoLote;
};

export const getCurrentBatchNumber = async (): Promise<number> => {
  const fechaCorte = getTodayCutoffDate();

  const batch = await Batch.findOne({
    where: { date: fechaCorte },
  });

  if (!batch) {
    throw new Error("No se encontró el lote del día.");
  }

  return batch.batchNumber;
};
