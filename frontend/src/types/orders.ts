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

export type OrderPayload = OrderFormData & {
  timestamp: string;
};

export type BackendOrderStatus =
  | "pendiente"
  | "completada"
  | "en progreso"
  | "cancelada";

// Tipo para el estado de orden en el frontend (para filtros)
export type OrderStatus = "pending" | "completed" | "in_progress" | "cancelled";

export type OrderListItem = {
  id: string; // Usar string para IDs para mayor flexibilidad
  ppe: number;
  orderNumber: number;
  date: string; // Formato YYYY-MM-DD
  kilos: string; // Del backend, es un string
  passedKilos: string | null; // Del backend, es un string o null
  batchNumber: number;
  cicle: number;
  endDate: string | null;
  lastKG: number;
  observation: string;
  isCanceled: boolean;
  isPrinted: boolean;
  firstTruck: string;
  secondTruck: string;
  processedKilos: string; // Del backend, es un string
  status: BackendOrderStatus; // Usar el tipo de estado del backend
  productId: number;
  clientId: number;
  colorId: number;
  denierId: number;
  toneId: number;
  rawMaterialId: number;
  client: {
    id: number;
    name: string;
  };
  color: {
    id: number;
    idColor: string;
    colorName: string;
    originalColorName: string;
    clientId: number;
  };
  denier: {
    id: number;
    denier: string; // Del backend, es un string
    key: number;
    coefficient: number;
  };
  tone: {
    id: number;
    name: string;
    description: string | null;
  };
  rawMaterial: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
};

export type OrdersFilter = {
  searchQuery: string;
  status: OrderStatus | "all"; // El filtro usa el tipo de frontend
  clientId: number | "all";
  startDate: string | null;
  endDate: string | null;
};

export type WeighingDetail = {
  id: number;
  date: string;
  time: string;
  grossWeight: string; // Del backend, es un string
  netWeight: string; // Del backend, es un string
  batch: number;
  bale: number;
  internalTare: string; // Del backend, es un string
  externalTare: string; // Del backend, es un string
  notes: string | null;
  typeWeightId: number;
  orderId: number;
  userId: number;
  user: {
    idUser: number;
    firstName: string;
    lastName: string;
  };
};

export type OrderDetail = {
  processedKilos: number; // Del backend, es un number
  id: number;
  ppe: number;
  orderNumber: number;
  date: string;
  kilos: string; // Del backend, es un string
  passedKilos: string | null;
  batchNumber: number;
  cicle: number;
  endDate: string | null;
  lastKG: number;
  observation: string;
  isCanceled: boolean;
  isPrinted: boolean;
  firstTruck: string;
  secondTruck: string;
  status: BackendOrderStatus; // Usar BackendOrderStatus
  productId: number;
  clientId: number;
  colorId: number;
  denierId: number;
  toneId: number;
  rawMaterialId: number;
  color: {
    id: number;
    idColor: string;
    colorName: string;
    originalColorName: string;
    clientId: number;
  };
  denier: {
    id: number;
    denier: string; // Del backend, es un string
    key: number;
    coefficient: number;
  };
  tone: {
    id: number;
    name: string;
    description: string | null;
  };
  rawMaterial: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  client: {
    id: number;
    name: string;
  };
  weighings: WeighingDetail[]; // Array de pesajes
};
