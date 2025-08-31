// types/utilities.ts
export type UtilityEntity =
  | "clients"
  | "colors"
  | "deniers"
  | "rawMaterials"
  | "products"
  | "sections"
  | "tones";

// Tipo de un campo en el formulario/config
export interface UtilityField {
  key: string;
  label: string;
  type: "text" | "number" | "color" | "select";
  required?: boolean;
}

// Configuración de una utilidad
export interface UtilityConfig {
  entityType: UtilityEntity;
  title: string;
  endpoint: string;
  createEndpoint: string;
  fields: UtilityField[];
}

// ---- Opcional: items por tipo (si querés más detalle) ----
export interface BaseUtilityItem {
  id: number;
  name?: string;
  description?: string;
  [key: string]: any;
}

export interface ClientItem extends BaseUtilityItem {
  name: string;
}

export interface ColorItem extends BaseUtilityItem {
  idColor: string;
  colorName: string;
  originalColorName?: string;
  clientId?: number;
}

export interface DenierItem extends BaseUtilityItem {
  denier: string;
  key?: number;
  coefficient?: string;
}

export type UtilityItem = ClientItem | ColorItem | DenierItem | BaseUtilityItem;
