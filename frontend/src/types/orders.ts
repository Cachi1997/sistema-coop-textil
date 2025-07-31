export type Client = {
  id: number;
  name: string;
};

export type Color = {
  id: number;
  idColor: string;
  colorName: string;
  originalColorName: string;
  clientId: number;
};

export type Denier = {
  id: number;
  denier: string;
  key: number;
  coefficient: number;
};

export type Product = {
  id: number;
  name: string;
};

export type RawMaterial = {
  id: number;
  name: string;
};

export type Tone = {
  id: number;
  name: string;
  description: string;
};

export type SelectorsData = {
  clients: Client[];
  deniers: Denier[];
  tones: Tone[];
  products: Product[];
  colors: Color[];
  rawMaterials: RawMaterial[];
};

export type OrderFormData = {
  ppe: number;
  partOriginal: number;
  orderNumber: number;
  date: string;
  clientId: number;
  denierId: number;
  toneId: number;
  productId: number;
  colorId: number;
  rawMaterialId: number;
  kilos: number;
  kilosPasados: number;
  camiones: string;
  observaciones: string;
};

export type OrderPayload = OrderFormData & {
  timestamp: string;
};
