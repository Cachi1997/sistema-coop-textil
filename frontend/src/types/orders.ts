// Tipos para el formulario de órdenes
export type OrderFormData = {
  ppe: number | undefined;
  originalBatch: number | undefined; // Corregido el nombre
  orderNumber: number | undefined;
  date: string;
  clientId: number;
  denierId: number;
  toneId: number;
  productId: number;
  colorId: number;
  rawMaterialId: number;
  kilos: number;
  passedKilos: number | undefined;
  truck1: string;
  truck2: string;
  notes: string;
};

// Tipos para los datos de los selectores que vienen del backend
export type Client = {
  id: number;
  name: string;
  code?: string;
};

export type Denier = {
  id: number;
  denier: number;
  description?: string;
};

export type Tone = {
  id: number;
  name: string;
  code?: string;
};

export type Product = {
  id: number;
  name: string;
  code?: string;
};

export type Color = {
  id: number;
  colorName: string;
  code?: string;
  hexCode?: string;
};

export type RawMaterial = {
  id: number;
  name: string;
  description?: string;
};

// Tipo para los datos de selectores agrupados
export type SelectorsData = {
  clients: Client[];
  deniers: Denier[];
  tones: Tone[];
  products: Product[];
  colors: Color[];
  rawMaterials: RawMaterial[];
};

// Tipo para el payload que se envía al backend
export type OrderPayload = OrderFormData & {
  timestamp: string;
};

// --- Tipos para la lista de órdenes (ajustados al backend) ---

// Tipo para los estados de orden tal como vienen del backend
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
};

// --- Nuevos tipos para el detalle de una orden ---

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

export type MaterialFormData = {
  entryDate: string; // fecha de ingreso
  clientId: number; // Cliente (selector del backend)
  rawMaterialId: number; // Origen (select de RawMaterial)
  truck: string; // Camion
  batch: string | undefined; // Lote (batch en backend)
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

// Tipo para el payload que se envía al backend
export type MaterialPayload = MaterialFormData & {
  timestamp: string;
};

export type TachaItem = {
  id: number;
  batch: string;
  baleNumber: number;
  baleKilos: string; // Del backend, es un string
  denier: string;
  luster: string;
  totalDenier: string;
  dispatched: boolean; // "remitido" en español
  rawMaterial: {
    name: string;
  };
};

export type TachaFilters = {
  date: string;
  clientId: number;
  truck: string;
  section: string;
};
