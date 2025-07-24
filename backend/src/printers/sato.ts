type LabelData = {
  peso: number;
  lote: string;
  fecha: string; // YYYY-MM-DD
  producto: string;
  codigoBarras: string;
};

const ESC = "\x1B";
const STX = "\x02";

export const generarComandoSBPL = (data: LabelData): string => {
  const { peso, lote, fecha, producto, codigoBarras } = data;

  return (
    STX +
    ESC +
    "A" +
    ESC +
    "H0100" +
    ESC +
    "V0100" +
    ESC +
    "L0101" +
    ESC +
    `TEXT "Producto: ${producto}"` +
    ESC +
    "H0100" +
    ESC +
    "V0200" +
    ESC +
    "L0101" +
    ESC +
    `TEXT "Lote: ${lote}"` +
    ESC +
    "H0100" +
    ESC +
    "V0300" +
    ESC +
    "L0101" +
    ESC +
    `TEXT "Fecha: ${fecha}"` +
    ESC +
    "H0100" +
    ESC +
    "V0400" +
    ESC +
    "L0101" +
    ESC +
    `TEXT "Peso: ${peso.toFixed(2)} kg"` +
    ESC +
    "H0100" +
    ESC +
    "V0550" +
    ESC +
    "BG01050" +
    codigoBarras +
    ESC +
    "Q1" +
    ESC +
    "Z"
  );
};
