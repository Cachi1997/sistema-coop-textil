import Batch from "../models/Batch";
import { getTodayCutoffDate } from "../utils/date.utils";


export const generateDailyBatch = async () => {
  const today = new Date();
  const weekDay = today.getDay();
  const currentHour = today.getHours();
  
  console.log(`Current hour: ${currentHour}`);
  // No crear lotes los domingos
  if (weekDay === 0) return null; 
  
  const todayStr = today.toISOString().split("T")[0];
  
  const existingBatch = await Batch.findOne({
    where: { date: "2025-09-12" },
  });
  
  // Si ya existe un batch para hoy, devolverlo
  if (existingBatch) {
    return existingBatch;
  }
  
  // Si no existe batch para hoy, verificar si es hora de crear uno
  // Solo crear batch si son las 06:00 AM o más tarde
  
  
  if (currentHour < 6) {
    // Es antes de las 06:00 AM, no crear batch nuevo
    // Devolver el último batch disponible (del día anterior)
    const lastBatch = await Batch.findOne({
      order: [["batchNumber", "DESC"]],
    });
    return lastBatch;
  }
  
  // Es después de las 06:00 AM y no hay batch para hoy, crear uno nuevo
  const lastBatch = await Batch.findOne({
    order: [["batchNumber", "DESC"]],
  });
  
  const newBatchNumber = lastBatch ? lastBatch.batchNumber + 1 : 4001;
  
  const newBatch = await Batch.create({
    batchNumber: newBatchNumber,
    date: today,
    isYarn: false,
  });
  
  return newBatch;
};

export const getCurrentBatch = async () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Determinar la fecha del "día laboral actual"
  const workingDate = getWorkingDate(now, currentHour);
  
  if (!workingDate) {
    // Es domingo y no hay "día laboral actual"
    return await getLastValidBatch();
  }
  
  const workingDateStr = workingDate.toISOString().split("T")[0];
  // Buscar lote existente para la fecha de trabajo
  const existingBatch = await Batch.findOne({
    where: { date: workingDateStr },
  });
  
  if (existingBatch) {
    return existingBatch;
  }
  
  // Si no existe lote y estamos en horario de trabajo (después de las 06:00)
  // y no es domingo, crear nuevo lote
  if (currentHour >= 6 && workingDate.getDay() !== 0) {
    return await generateDailyBatch();
  }
  
  // Si no se puede crear lote nuevo, devolver el último válido
  return await getLastValidBatch();
};

// Función helper para determinar qué fecha de trabajo usar
const getWorkingDate = (currentDate: Date, currentHour: number): Date | null => {
  const weekDay = currentDate.getDay();
  
  // Si es domingo, no hay "día laboral actual"
  if (weekDay === 0) {
    return null;
  }
  
  // Si es antes de las 06:00, el "día laboral" es el día anterior
  if (currentHour < 6) {
    const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayWeekDay = yesterday.getDay();
    
    // Si ayer fue domingo, usar el sábado (último día laboral)
    if (yesterdayWeekDay === 0) {
      return new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000); // Sábado
    }
    
    return yesterday;
  }
  
  // Si es después de las 06:00, el día laboral es hoy
  return currentDate;
};

// Función helper para obtener el último lote válido (no domingo)
const getLastValidBatch = async () => {
  const lastBatch = await Batch.findOne({
    order: [["batchNumber", "DESC"]],
  });
  
  return lastBatch;
};

// Función opcional para debugging/logging
export const getBatchInfo = async () => {
  const now = new Date();
  const currentHour = now.getHours();
  const workingDate = getWorkingDate(now, currentHour);
  
  return {
    currentTime: now.toISOString(),
    currentHour,
    weekDay: now.getDay(),
    workingDate: workingDate?.toISOString().split("T")[0] || null,
    shouldCreateNewBatch: workingDate && currentHour >= 6 && workingDate.getDay() !== 0,
  };
};

export const getCurrentBatchNumber = async (): Promise<number> => {
  const cutOffDate = getTodayCutoffDate();

  let batch = await Batch.findOne({
    where: { date: cutOffDate },
  });

  if (!batch) {
    batch = await generateDailyBatch();
  }

  return batch.batchNumber;
};
