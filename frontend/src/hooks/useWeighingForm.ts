import type React from "react";
import { useForm } from "react-hook-form";
import type { WeightData } from "../types";
import { useModal } from "./useModal";
import { useUserValidation } from "./useUserValidation";
import { useDataValidation } from "./useDataValidation";
import { useFormNavigation } from "./useFormNavigation";

const campos = [
  { name: "user", label: "Usuario", type: "number" },
  { name: "isYarn", label: "Hilado (1) o Top (0)", type: "number" },
  { name: "ppe", label: "P.P.E", type: "number" },
  { name: "batch", label: "Partida", type: "number" },
  { name: "internalTare", label: "Tara Interna", type: "number" },
  { name: "externalTare", label: "Tara Externa", type: "number" },
];

export const useWeighingForm = () => {
  const form = useForm<WeightData>({
    defaultValues: {
      user: "",
      isYarn: 0,
      ppe: 0,
      batch: 0,
      internalTare: 0,
      externalTare: 0,
    },
  });

  const modal = useModal();
  const userValidation = useUserValidation();
  const dataValidation = useDataValidation();
  const navigation = useFormNavigation({
    setFocus: form.setFocus,
    campos,
  });

  const handleEnterKey = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentField = campos[index].name;

      // Validar usuario
      if (currentField === "user") {
        const userCode = Number(form.watch("user"));
        const usuarioExistente = await userValidation.verificarUsuario(
          userCode
        );
        if (!usuarioExistente || usuarioExistente.id === 0) {
          modal.showModal(
            "Usuario No Encontrado",
            `El usuario con código ${userCode} no existe en la base de datos.`
          );
          return;
        }
      }

      // Validar datos
      if (currentField === "batch") {
        const ppe = form.watch("ppe");
        const batch = form.watch("batch");
        const isYarn = form.watch("isYarn");

        const datosEncontrados = await dataValidation.buscarDatos({
          ppe,
          batch,
          isYarn,
        });
        if (!datosEncontrados) {
          modal.showModal(
            "Datos No Encontrados",
            `No se encontraron datos para:
              P.P.E: ${ppe}
              Partida: ${batch}
              Hilado: ${isYarn ? "Sí" : "No"}`
          );
          return;
        }
      }

      // Navegar al siguiente campo
      navigation.navigateToNextField(index);
    }
  };

  const registerWeight = (data: WeightData, netWeight: number | null) => {
    const payload = {
      ...data,
      weight: netWeight || 0,
      batchData: dataValidation.orderData, // Incluir los datos de la partida
    };
    console.log("Datos del formulario:", payload);
    // Aquí iría la llamada al backend
  };

  const resetForm = () => {
    form.reset();
    dataValidation.clearOrderData();
  };

  return {
    form,
    modal,
    user: userValidation.user,
    navigation,
    orderData: dataValidation.orderData,
    isLoadingBatchData: dataValidation.isLoading,
    campos,
    handleEnterKey,
    registerWeight,
    resetForm,
  };
};
