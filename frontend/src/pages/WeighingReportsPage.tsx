import { useState } from "react";
import WeighingFilters from "../components/weighing/WeighingFilters";
import WeighingTable from "../components/weighing/WeighingTable";
import axios from "../config/axiosInstance";

export default function WeighingPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Guardamos los filtros activos para reutilizarlos en la exportación
  const [activeFilters, setActiveFilters] = useState<{
    startDate?: string;
    endDate?: string;
    batch?: number;
  }>({});

  const fetchByDates = async (start: string, end: string) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `weighings/reports?startDate=${start}&endDate=${end}`
      );
      setData(res.data);
      setActiveFilters({ startDate: start, endDate: end });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchByBatch = async (batch: number) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`weighings/reports?batch=${batch}`);
      setData(res.data);
      setActiveFilters({ batch });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPdf = async () => {
    if (!activeFilters.startDate && !activeFilters.batch) {
      alert("Primero debes realizar una búsqueda antes de exportar.");
      return;
    }

    try {
      const response = await axios.get("weighings/export/pdf", {
        params: activeFilters,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      // Abrir en nueva pestaña
      window.open(url, "_blank");
      setPdfUrl(url);
    } catch (error) {
      console.error("Error al exportar PDF:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4 text-green-400">Pesajes</h1>

      <WeighingFilters
        onSearchByDates={fetchByDates}
        onSearchByBatch={fetchByBatch}
      />

      <button
        onClick={handleExportPdf}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white mb-2"
      >
        Exportar a PDF
      </button>

      {isLoading ? (
        <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-3"></div>
          Cargando pesajes...
        </div>
      ) : (
        <WeighingTable data={data} />
      )}
    </div>
  );
}
