import cron from "node-cron";
import { generateDailyBatch } from "../services/batchServices";

// Ejecutar todos los días a las 06:00 AM, de lunes a sábado (domingos no)
export const batchGenerationTask = () => {
  cron.schedule("0 6 * * 1-6", async () => {
    await generateDailyBatch();
  });
};
