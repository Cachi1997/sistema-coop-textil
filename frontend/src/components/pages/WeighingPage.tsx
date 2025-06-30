import { useEffect, useState } from "react";
import type { WeightData } from "../../types";
import WeightDisplay from "../display/WeightDisplay";

interface FormData {
  usuario: string;
  hilado: number;
  ppe: string;
  partida: string;
  taraInterna: string;
  taraExterna: string;
}

export const WeighingPage = () => {
  const [campoActivo, setCampoActivo] = useState<number>(0);
  const [formData, setFormData] = useState<WeightData>({
    weight: 0,
    user: "",
    isYarn: false,
    PPE: 0,
    batch: 0,
    internalTare: 0,
    externalTare: 0,
  });

  const campos = [
    { name: "usuario", label: "Usuario", type: "text" },
    { name: "hilado", label: "Hilado", type: "select" },
    { name: "ppe", label: "P.P.E", type: "text" },
    { name: "partida", label: "Partida", type: "text" },
    { name: "taraInterna", label: "Tara Interna", type: "number" },
    { name: "taraExterna", label: "Tara Externa", type: "number" },
  ];
  return (
    <div className="h-screen bg-gray-900 text-white p-4 overflow-hidden">
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
          <WeightDisplay
            internalTare={formData.internalTare}
            externalTare={formData.externalTare}
          />
        </div>
      </div>
    </div>
  );
};
