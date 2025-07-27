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
