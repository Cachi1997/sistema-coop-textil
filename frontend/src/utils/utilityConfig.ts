import type { UtilityConfig } from "../types/utilities";

export const utilityConfigs = {
  clients: {
    entityType: "clients",
    title: "Clientes",
    endpoint: "utilities/clients",
    createEndpoint: "utilities/clients",
    fields: [{ key: "name", label: "Nombre", type: "text", required: true }],
  },
  colors: {
    entityType: "colors",
    title: "Colores",
    endpoint: "utilities/colors",
    createEndpoint: "utilities/colors",
    fields: [
      {
        key: "idColor",
        label: "Codigo del color",
        type: "text",
        required: true,
      },
      {
        key: "colorName",
        label: "Nombre del Color",
        type: "text",
        required: true,
      },
      {
        key: "originalColorName",
        label: "Nombre del Color del Cliente (opcional)",
        type: "text",
      },
      { key: "clientId", label: "Cliente (opcional)", type: "select" },
    ],
  },
  deniers: {
    entityType: "deniers",
    title: "Deniers",
    endpoint: "utilities/deniers",
    createEndpoint: "utilities/deniers",
    fields: [
      { key: "denier", label: "Denier", type: "text", required: true },
      { key: "key", label: "Clave", type: "number", required: true },
      { key: "coefficient", label: "Coeficiente", type: "text" },
    ],
  },
  rawMaterials: {
    entityType: "rawMaterials",
    title: "Materias Primas",
    endpoint: "utilities/rawMaterials",
    createEndpoint: "utilities/rawMaterials",
    fields: [{ key: "name", label: "Nombre", type: "text", required: true }],
  },
  products: {
    entityType: "products",
    title: "Productos",
    endpoint: "utilities/products",
    createEndpoint: "utilities/products",
    fields: [{ key: "name", label: "Nombre", type: "text", required: true }],
  },
  sections: {
    entityType: "sections",
    title: "Secciones",
    endpoint: "utilities/sections",
    createEndpoint: "utilities/sections",
    fields: [{ key: "name", label: "Nombre", type: "text", required: true }],
  },
  tones: {
    entityType: "tones",
    title: "Tonos",
    endpoint: "utilities/tones",
    createEndpoint: "utilities/tones",
    fields: [
      { key: "name", label: "Nombre", type: "text", required: true },
      { key: "description", label: "Descripción", type: "text" },
    ],
  },
  // ... resto igual
} as const satisfies Record<string, UtilityConfig>;

export type UtilityType = keyof typeof utilityConfigs;
