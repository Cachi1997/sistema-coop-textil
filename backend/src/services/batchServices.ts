import Batch from "../models/Batch";
import { getTodayCutoffDate } from "../utils/date.utils";

export const generateDailyBatch = async () => {
  const today = new Date();
  const weekDay = today.getDay();

  if (weekDay === 0) return null;

  const todayStr = today.toISOString().split("T")[0];

  const existingBatch = await Batch.findOne({
    where: { date: todayStr },
  });

  if (existingBatch) {
    return existingBatch;
  }

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
