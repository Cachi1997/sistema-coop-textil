import Batch from "../models/Batch";

export const generarLoteDelDia = async () => {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 = Domingo, 6 = Sábado

  if (diaSemana === 0) return null; // Si es domingo, no se genera lote

  const fechaHoy = hoy.toISOString().split("T")[0]; // YYYY-MM-DD

  const loteExistente = await Batch.findOne({ where: { date: fechaHoy } });

  if (loteExistente) {
    return loteExistente; // Ya existe lote para hoy
  }

  const ultimoLote = await Batch.findOne({
    order: [["batchNumber", "DESC"]],
  });

  const nuevoNumeroLote = ultimoLote
    ? parseInt(ultimoLote.batchNumber, 10) + 1
    : 4001; // Lógica inicial

  const nuevoLote = await Batch.create({
    batchNumber: nuevoNumeroLote.toString(),
    date: fechaHoy,
    isYarn: false, // o el valor que corresponda según tu lógica
  });

  return nuevoLote;
};
