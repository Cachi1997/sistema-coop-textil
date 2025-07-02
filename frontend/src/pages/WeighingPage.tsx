import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import type { WeightData } from "../types";
import WeightDisplay from "../components/display/WeightDisplay";
import { useWeightSocket } from "../hooks/useWeightSocket";
import { LabelDisplay } from "../components/display/LabelDisplay";

export const WeighingPage = () => {
  const grossWeight = useWeightSocket();

  const inputRefs = useRef<(HTMLInputElement | HTMLSelectElement | null)[]>([]);
  const submitButtonRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
    setFocus,
  } = useForm<WeightData>({
    defaultValues: {
      user: "",
      isYarn: 0,
      ppe: 0,
      batch: 0,
      internalTare: 0,
      externalTare: 0,
    },
  });

  // Obtenemos los valores actuales del formulario para calcular el peso neto
  const internalTare = watch("internalTare") || 0;
  const externalTare = watch("externalTare") || 0;

  const netWeight =
    grossWeight !== null ? grossWeight - internalTare - externalTare : null;

  const registerWeight = (data: WeightData) => {
    const payload = {
      ...data,
      weight: netWeight || 0,
    };
    console.log("Datos del formulario:", payload);
    // Aquí iría la llamada al backend
  };

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const nextFieldName = campos[index + 1]?.name;

      if (nextFieldName) {
        setFocus(nextFieldName as keyof WeightData);
      } else {
        // Si no hay más campos, enfocar el botón de enviar
        submitButtonRef.current?.focus();
      }
    }
  };

  const campos = [
    { name: "user", label: "Usuario", type: "text" },
    { name: "isYarn", label: "Hilado (1) o Top (0)", type: "number" },
    { name: "ppe", label: "P.P.E", type: "number" },
    { name: "batch", label: "Partida", type: "number" },
    { name: "internalTare", label: "Tara Interna", type: "number" },
    { name: "externalTare", label: "Tara Externa", type: "number" },
  ];

  return (
    <div className="h-screen bg-gray-900 text-white p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-400">SISTEMA DE PESAJE</h1>
        <div className="text-right text-sm">
          <div className="text-green-400">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-120px)]">
        {/* Columna 1: Peso actual */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-center mb-3 text-green-400">
            PESO ACTUAL
          </h2>
          <WeightDisplay grossWeight={grossWeight} netWeight={netWeight} />
        </div>

        {/* Columna 2: Formulario */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-center mb-3 text-green-400">
            DATOS DE REGISTRO
          </h2>
          <form onSubmit={handleSubmit(registerWeight)} className="space-y-3">
            {campos.map((campo, index) => (
              <div
                key={index}
                className="p-3 mb-2 rounded-lg border-2 border-gray-600 bg-gray-750"
              >
                <LabelDisplay
                  message={campo.label}
                  className="block text-sm font-medium mb-1 text-gray-300"
                />
                <input
                  type={campo.type}
                  {...register(campo.name as keyof WeightData, {
                    required:
                      campo.name !== "internalTare" &&
                      campo.name !== "externalTare",
                    valueAsNumber: campo.type === "number",
                  })}
                  onKeyDown={(e) => handleEnterKey(e, index)}
                  className={`w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none ${
                    errors[campo.name as keyof WeightData]
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {errors[campo.name as keyof WeightData] && (
                  <span className="text-red-500 text-xs mt-1">
                    Este campo es obligatorio
                  </span>
                )}
              </div>
            ))}

            <input
              type="submit"
              ref={submitButtonRef}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
              value="Enviar"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
