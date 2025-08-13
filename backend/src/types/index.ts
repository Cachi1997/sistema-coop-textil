export type WeightData = {
  user: string;
  isYarn: number;
  ppe: number;
  batch: number;
  internalTare: number;
  externalTare: number;
  grossWeight: number | null;
  netWeight: number | null;
};

export type TicketData = {
  product: string;
  denier: string;
  tone: string;
  rawMaterial: string;
  colorId: string;
  ppe: number;
  orderNumber: number;
  colorName: string;
  client: string;
  batchNumber: number;
  batch: number;
  bale: number;
  netWeight: number;
};

export type OrderData = {
  ppe: number;
  originalBatch: number;
  orderNumber: number;
  date: string;
  clientId: number;
  denierId: number;
  toneId: number;
  productId: number;
  colorId: number;
  rawMaterialId: number;
  kilos: number;
  passedKilos: number;
  truck1: string;
  truck2: string;
  notes: string;
};

export type FinishedProductData = {
  productCode: string;
  batchId: number;
  orderId: number;
};

export type MaterialReceiptData = {
  entryDate: string; // fecha de ingreso
  clientId: number; // Cliente (selector del backend)
  rawMaterialId: number; // Origen (select de RawMaterial)
  truck: string; // Camion
  batch: string; // Lote (batch en backend)
  baleNumber: string; // Nro Fardo
  kilos: number | undefined; // Kilos
  batchNumber: number | undefined; // Partida (batchNumber en backend)
  colorId: number;
  color: string;
  product: string;
  denier: string;
  denierTotal: string;
  luster: string;
  merge: string;
};
