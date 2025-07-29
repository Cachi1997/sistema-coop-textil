import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import util from "util";
import { TicketData } from "../types";

const execAsync = util.promisify(exec);

const printerName = "SATO CG408";
const sumatraPath = `"C:\\SumatraPDF\\SumatraPDF.exe"`; // Ruta a Sumatra
const pdfRoute = path.join(__dirname, "../../ticket.pdf");

const generatePDF = async (data: TicketData) => {
  const mmToPt = (mm: number) => mm * 2.83465;
  const width = mmToPt(100);
  const height = mmToPt(100);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([width, height]);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const x = 12;
  let y = height - 30;

  const lines = [
    { text: `${data.product}`, font: fontBold, size: 26 },
    {
      text: `${data.colorId === "tpco" ? " " : data.colorName}`,
      font: fontBold,
      size: 22,
    },
    { text: " ", font: fontBold, size: 6 },
    {
      text: `${data.denier} - ${data.tone} - ${data.rawMaterial}`,
      font: fontBold,
      size: 22,
    },
    { text: " ", font: fontBold, size: 12 },
    {
      text: `PPE/ Orden: ${data.ppe}/${data.orderNumber}`,
      font: fontBold,
      size: 22,
    },
    {
      text: `Cliente: ${data.colorId === "tpco" ? " " : data.client}`,
      font: fontBold,
      size: 22,
    },
    { text: `Color: ${data.colorId}`, font: fontBold, size: 22 },
    { text: " ", font: fontBold, size: 6 },
    { text: `Partida: ${data.batchNumber}`, font: fontBold, size: 22 },
    { text: " ", font: fontBold, size: 6 },
    {
      text: `L: ${data.batch}      F:${data.bale}     N: ${Math.floor(
        data.netWeight
      )}`,
      font: fontBold,
      size: 22,
    },
  ];

  for (const line of lines) {
    page.drawText(line.text, {
      x,
      y,
      size: line.size,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    y -= line.size + 4;
  }
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfRoute, pdfBytes);
};

const printPDF = async () => {
  const command = `${sumatraPath} -print-to "${printerName}" "${pdfRoute}"`;

  try {
    await execAsync(command);
  } catch (error: any) {
    console.error(`❌ Error al imprimir: ${error.message}`);
  }
};

export default {
  generatePDF,
  printPDF,
};
