import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import util from "util";
import { TicketData } from "../types";
import { es } from "date-fns/locale";
import { Weighing } from "../models/Weighing"; // ajusta el import a tu estructura
import { Order } from "../models/Order";
import { format } from "date-fns";

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

  if (
    data.colorId.toLowerCase() === "tpco" ||
    data.colorId.toLowerCase() === "hil" ||
    data.colorId.toLowerCase() === "hilach" ||
    data.colorId.toLowerCase() === "desp" ||
    data.colorId.toLowerCase() === "crudo" ||
    data.product.toLowerCase() === "desp hilacha" ||
    data.product.toLowerCase() === "desp lana" ||
    data.product.toLowerCase() === "desp top col" ||
    data.product.toLowerCase() === "desp top cru" ||
    data.product.toLowerCase() === "desp tow col" ||
    data.product.toLowerCase() === "desp tow cru"
  ) {
    data.client = " ";
  }

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
      text: `Cliente: ${data.client}`,
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

export const generateWeighingsPdf = async (weighings: Weighing[]) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // helper para crear página
  const createPage = () => {
    return pdfDoc.addPage([842, 595]); // A4 horizontal
  };

  // === Fecha ===
  const fechaHoy = format(new Date(), "dd/MM/yyyy", { locale: es });

  // === Agrupar pesajes por orden ===
  const grouped: Record<number, { order: Order; weighings: Weighing[] }> = {};
  for (const w of weighings) {
    const order = w.order as Order;
    if (!grouped[order.id]) {
      grouped[order.id] = { order, weighings: [] };
    }
    grouped[order.id].weighings.push(w);
  }
  const orderIds = Object.keys(grouped);

  // === Encabezados de filas ===
  const rowLabels = [
    "Cliente",
    "Origen / Materia Prima",
    "Producto",
    "Color",
    "Partida",
    "PPE",
  ];

  // === Config tabla ===
  const colWidth = 120;
  const rowHeight = 20;
  const startX = 50;
  const tableLeftX = startX;

  // Cálculo del máximo de columnas por página
  const dummyPage = createPage();
  const { width: dummyWidth, height: dummyHeight } = dummyPage.getSize();
  pdfDoc.removePage(0); // 🔥 eliminar página dummy
  const maxColsPerPage = Math.floor((dummyWidth - (startX + 160)) / colWidth);

  // === Iterar páginas por bloques de columnas ===
  for (
    let pageIndex = 0;
    pageIndex < orderIds.length;
    pageIndex += maxColsPerPage
  ) {
    let page = createPage();
    let { height, width } = page.getSize();
    let y = height - 40;

    // === Título y fecha en cada página ===
    page.drawText("Lista de Tachas de Hilado", {
      x: width / 2 - 100,
      y,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 30;

    page.drawText(`Fecha: ${fechaHoy}`, { x: startX, y, size: 12, font });
    y -= 20;

    page.drawText(`Lote: ${weighings[0].batch || "-"}`, {
      x: startX,
      y,
      size: 12,
      font,
    });
    y -= 40;

    const currentCols = orderIds.slice(pageIndex, pageIndex + maxColsPerPage);

    // === Calcular alto dinámico de la tabla ===
    const maxFardos = Math.max(
      ...currentCols.map((id) => grouped[parseInt(id)].weighings.length)
    );
    const totalRows = rowLabels.length + maxFardos + 1; // +1 fila de total
    const tableHeight = totalRows * rowHeight;
    const tableTopY = y;
    const tableWidth = 150 + currentCols.length * colWidth;

    // === Dibujar bordes externos ===
    page.drawRectangle({
      x: tableLeftX,
      y: tableTopY - tableHeight,
      width: tableWidth,
      height: tableHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    // === Líneas horizontales ===
    for (let i = 1; i < totalRows; i++) {
      const rowY = tableTopY - i * rowHeight;
      page.drawLine({
        start: { x: tableLeftX, y: rowY },
        end: { x: tableLeftX + tableWidth, y: rowY },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
    }

    // === Línea vertical fija (separa etiquetas de columnas) ===
    page.drawLine({
      start: { x: tableLeftX + 150, y: tableTopY },
      end: { x: tableLeftX + 150, y: tableTopY - tableHeight },
      thickness: 0.5,
      color: rgb(0, 0, 0),
    });

    // === Columnas dinámicas (una por orden) ===
    for (let i = 1; i <= currentCols.length; i++) {
      const colX = tableLeftX + 150 + i * colWidth;
      page.drawLine({
        start: { x: colX, y: tableTopY },
        end: { x: colX, y: tableTopY - tableHeight },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
    }

    // === Rellenar filas ===
    currentCols.forEach((id, colIndex) => {
      const { order, weighings } = grouped[parseInt(id)];
      let batchAndOrder = order.batchNumber + " - " + order.orderNumber;

      // --- Filas fijas ---
      rowLabels.forEach((label, rowIndex) => {
        const rowY = tableTopY - rowIndex * rowHeight - 15;
        if (colIndex === 0) {
          // etiquetas solo en la primera columna
          page.drawText(label, {
            x: tableLeftX + 5,
            y: rowY,
            size: 12,
            font,
          });
        }

        let value = "";
        switch (label) {
          case "Cliente":
            value = order.client?.name || "";
            break;
          case "Origen / Materia Prima":
            value = order.rawMaterial?.name || "";
            break;
          case "Producto":
            value = order.product?.name || "";
            break;
          case "Color":
            value = order.color?.colorName || "";
            break;
          case "Partida":
            value = batchAndOrder || "";
            break;
          case "PPE":
            value = order.ppe?.toString() || "";
            break;
        }

        page.drawText(value, {
          x: tableLeftX + 160 + colIndex * colWidth,
          y: rowY,
          size: 12,
          font,
        });
      });

      // --- Fardos ---
      let total = 0;
      weighings.forEach((w, i) => {
        const netWeight = Number(w.netWeight) || 0;
        const rowIndex = rowLabels.length + i;
        const rowY = tableTopY - rowIndex * rowHeight - 15;

        page.drawText(`Fardo ${w.bale}: ${netWeight.toFixed(2)} Kgs`, {
          x: tableLeftX + 160 + colIndex * colWidth,
          y: rowY,
          size: 11,
          font,
        });

        total += netWeight;
      });

      // --- Total ---
      const totalRowIndex = rowLabels.length + maxFardos;
      const totalY = tableTopY - totalRowIndex * rowHeight - 15;

      page.drawText(`Total: ${total.toFixed(2)} Kgs`, {
        x: tableLeftX + 160 + colIndex * colWidth,
        y: totalY,
        size: 12,
        font,
      });
    });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};

export default {
  generatePDF,
  printPDF,
  generateWeighingsPdf,
};
