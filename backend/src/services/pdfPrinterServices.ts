import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import util from "util";
import { TicketData } from "../types";

const execAsync = util.promisify(exec);

const nombreImpresora = "SATO CG408";
const sumatraPath = `"C:\\SumatraPDF\\SumatraPDF.exe"`; // Ruta a Sumatra
const rutaPDF = path.join(__dirname, "../../etiqueta.pdf");

const generarPDF = async (data: TicketData) => {
  const mmToPt = (mm: number) => mm * 2.83465;
  const width = mmToPt(100);
  const height = mmToPt(100);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([width, height]);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const x = 12;
  let y = height - 30;

  const lines = [
    { texto: `${data.product}`, fuente: fontBold, size: 26 },
    { texto: `${data.colorName}`, fuente: fontBold, size: 26 },
    { texto: "", fuente: fontBold, size: 18 },
    {
      texto: `${data.denier} - ${data.tone} - ${data.rawMaterial}`,
      fuente: fontBold,
      size: 22,
    },
    {
      texto: `PPE/ Orden: ${data.ppe}/${data.orderNumber}`,
      fuente: fontBold,
      size: 22,
    },
    { texto: `Cliente: ${data.client}`, fuente: fontBold, size: 22 },
    { texto: `Color: ${data.colorId}`, fuente: fontBold, size: 22 },
    { texto: `Partida: ${data.batchNumber}`, fuente: fontBold, size: 22 },
    {
      texto: `L: ${data.batch}      F:${data.bale}     N: ${Math.floor(
        data.netWeight
      )}`,
      fuente: fontBold,
      size: 22,
    },
  ];

  for (const linea of lines) {
    page.drawText(linea.texto, {
      x,
      y,
      size: linea.size,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    y -= linea.size + 4; // espaciado vertical
  }
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(rutaPDF, pdfBytes);
  console.log(`✅ PDF generado en: ${rutaPDF}`);
};

const imprimirPDF = async () => {
  const comando = `${sumatraPath} -print-to "${nombreImpresora}" "${rutaPDF}"`;

  try {
    await execAsync(comando);
  } catch (error: any) {
    console.error(`❌ Error al imprimir: ${error.message}`);
  }
};

export default {
  generarPDF,
  imprimirPDF,
};
