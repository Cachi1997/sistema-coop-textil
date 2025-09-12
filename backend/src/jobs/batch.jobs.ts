import cron from "node-cron";
import { generateDailyBatch } from "../services/batchServices";

// Ejecutar todos los días a las 06:00 AM, de lunes a sábado (domingos no)
// Formato: minuto hora día-mes mes día-semana
// 0 6 * * 1-6 = 06:00 AM de lunes (1) a sábado (6)
export const batchGenerationTask = () => {
  cron.schedule("0 6 * * 1-6", async () => {
    try {
      console.log("🕒 Executing scheduled batch generation...");
      const batch = await generateDailyBatch();
      if (batch) {
        console.log(`✅ Daily batch generated successfully: Batch #${batch.batchNumber}`);
      } else {
        console.log("ℹ️ No batch generation needed (Sunday or batch already exists)");
      }
    } catch (error) {
      console.error("❌ Error in scheduled batch generation:", error);
    }
  });
  
  console.log("🕒 Batch generation cron job scheduled for 06:00 AM (Monday-Saturday)");
};