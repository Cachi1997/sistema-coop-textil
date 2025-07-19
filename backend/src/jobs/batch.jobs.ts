import cron from "node-cron";
import { generarLoteDelDia } from "../services/batchServices";

// Ejecutar todos los días a las 06:00 AM, de lunes a sábado (domingos no)
export const iniciarTareaGeneracionLote = () => {
  cron.schedule("0 6 * * 1-6", async () => {
    await generarLoteDelDia();
  });
};
