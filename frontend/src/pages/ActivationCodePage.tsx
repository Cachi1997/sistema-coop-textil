import { useState } from "react";
import axios from "../config/axiosInstance";

export const ActivationPage = ({ onActivate }: { onActivate: () => void }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/utilities/activation/validate", { code });
      const { type } = res.data; // ej: { type: "balance" | "normal" }

      // guardamos en localStorage
      localStorage.setItem("activation", JSON.stringify({ code, type }));

      onActivate();
    } catch (err: any) {
      setError("Código inválido o error de conexión");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-white text-xl mb-4 font-bold">Activación</h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingrese código"
          className="w-full p-2 rounded bg-gray-700 text-white outline-none mb-3"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 rounded"
        >
          Activar
        </button>
      </form>
    </div>
  );
};
