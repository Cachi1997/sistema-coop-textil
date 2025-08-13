import { useForm } from "react-hook-form";
import type { MaterialFormData, MaterialPayload } from "../types/orders";
import { useModal } from "./useModal";
import { useSelectorsData } from "./useSelectorsData";
import { useFormNavigation } from "./useFormNavigation";
import axios from "../config/axiosInstance";

const campos = [
  { name: "entryDate", label: "Fecha de Ingreso", type: "date" },
  { name: "clientId", label: "Cliente", type: "select" },
  { name: "rawMaterialId", label: "Origen", type: "select" },
  { name: "truck", label: "Camión", type: "text" },
  { name: "batch", label: "Lote", type: "text" },
  { name: "baleNumber", label: "Nro Fardo", type: "number" },
  { name: "kilos", label: "Kilos", type: "number" },
  { name: "batchNumber", label: "Partida", type: "number" },
  { name: "colorId", label: "IdColor", type: "select" },
  { name: "color", label: "Color", type: "text" },
  { name: "product", label: "Producto", type: "text" },
  { name: "denier", label: "Denier", type: "text" },
  { name: "denierTotal", label: "Denier Total", type: "text" },
  { name: "luster", label: "Lustre", type: "text" },
  { name: "merge", label: "Merge", type: "text" },
];

export const useMaterialForm = () => {
  const form = useForm<MaterialFormData>({
    defaultValues: {
      entryDate: new Date().toISOString().split("T")[0], // Fecha actual por defecto
      clientId: 0,
      rawMaterialId: 0,
      truck: "",
      batch: undefined,
      baleNumber: "",
      kilos: undefined,
      batchNumber: undefined,
      colorId: 0,
      color: "",
      product: "",
      denier: "",
      denierTotal: "",
      luster: "",
      merge: "",
    },
  });

  const modal = useModal();
  const selectorsData = useSelectorsData();
  const navigation = useFormNavigation({
    setFocus: form.setFocus,
    campos,
  });

  const handleEnterKey = async (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigation.navigateToNextField(index);
    }
  };

  const createMaterial = async (data: MaterialPayload) => {
    try {
      console.log(data);

      const resp = await axios.post("/materials/material", data);
      console.log("Respuesta del backend (éxito):", resp.data);
    } catch (error: any) {
      console.error(
        "Error al enviar material al backend:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error desconocido al crear el material.";
      throw new Error(errorMessage);
    }
  };

  const resetForm = () => {
    form.reset({
      entryDate: new Date().toISOString().split("T")[0],
      clientId: 0,
      rawMaterialId: 0,
      truck: "",
      batch: undefined,
      baleNumber: "",
      kilos: undefined,
      batchNumber: undefined,
      colorId: 0,
      color: "",
      product: "",
      denier: "",
      denierTotal: "",
      luster: "",
      merge: "",
    });
    // Volver a enfocar el primer campo después de limpiar
    setTimeout(() => {
      form.setFocus("entryDate");
      navigation.setActiveFieldIndex(0);
    }, 100);
  };

  return {
    form,
    modal,
    navigation,
    selectorsData: selectorsData.selectorsData,
    isLoadingSelectors: selectorsData.isLoading,
    selectorsError: selectorsData.error,
    campos,
    handleEnterKey,
    createMaterial,
    resetForm,
    refetchSelectorsData: selectorsData.refetchData,
    activeFieldIndex: navigation.activeFieldIndex,
  };
};
