export type WeightData = {
  user: string;
  isYarn: number;
  ppe: number;
  batch: number;
  internalTare: number;
  externalTare: number;
};

export type ExtendedWeightData = WeightData & {
  grossWeight: number | null;
  netWeight: number | null;
};

export type User = {
  id: number;
  name: string;
  lastName: string;
  dni: number;
  code: number;
};

export type orderWeightResponse = {
  ppe: number;
  batchNumber: number;
  orderNumber: number;
  idColor: string;
  colorName: string;
  denier: number;
  tone: string;
  material: string;
  product: string;
  client: string;
};
