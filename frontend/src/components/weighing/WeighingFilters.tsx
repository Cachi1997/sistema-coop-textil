import { useState } from "react";

interface WeighingFiltersProps {
  onSearchByDates: (start: string, end: string) => void;
  onSearchByBatch: (batch: number) => void;
}

export default function WeighingFilters({
  onSearchByDates,
  onSearchByBatch,
}: WeighingFiltersProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batch, setBatch] = useState("");
  const [error, setError] = useState("");

  const isBatchSearch = batch !== "";
  const isDateSearch = startDate !== "" || endDate !== "";

  const handleSearch = () => {
    setError("");

    // Validar que se complete algo
    if (!isBatchSearch && !isDateSearch) {
      setError("Debes ingresar un rango de fechas o un número de lote.");
      return;
    }

    // Validar fechas
    if (isDateSearch) {
      if (!startDate || !endDate) {
        setError("Debes completar ambas fechas.");
        return;
      }
      if (new Date(endDate) < new Date(startDate)) {
        setError("La fecha de fin no puede ser menor que la fecha de inicio.");
        return;
      }
      onSearchByDates(startDate, endDate);
      return;
    }

    // Validar lote
    if (isBatchSearch) {
      if (isNaN(Number(batch))) {
        setError("El lote debe ser un número válido.");
        return;
      }
      onSearchByBatch(Number(batch));
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center gap-4">
      {/* Fechas */}
      <div className="flex items-center gap-2">
        <label className="text-gray-300">Inicio:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={isBatchSearch}
          className="bg-gray-700 text-gray-200 rounded px-2 py-1"
        />
        <label className="text-gray-300">Fin:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={isBatchSearch}
          className="bg-gray-700 text-gray-200 rounded px-2 py-1"
        />
      </div>

      {/* Lote */}
      <div className="flex items-center gap-2">
        <label className="text-gray-300">Lote:</label>
        <input
          type="number"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          disabled={isDateSearch}
          className="bg-gray-700 text-gray-200 rounded px-2 py-1"
          placeholder="Número de lote"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
      >
        Buscar
      </button>

      {error && <p className="text-red-400 mt-2 md:mt-0">{error}</p>}
    </div>
  );
}
