import { useParams, useNavigate } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrderDetail";
import type { WeighingDetail } from "../types/orders";
import { ChevronLeft } from "lucide-react";

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, isLoading, error } = useOrderDetail(id);

  const formatKilos = (kilos: string | number | null | undefined) => {
    if (kilos === null || kilos === undefined) return "N/A";
    return Number.parseFloat(kilos.toString()).toFixed(2) + " kg";
  };

  const renderDetailRow = (
    label: string,
    value: string | number | null | undefined
  ) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
      <span className="text-gray-400 font-medium">{label}:</span>
      <span className="text-white font-mono">
        {value !== null && value !== undefined ? value.toString() : "N/A"}
      </span>
    </div>
  );

  const renderWeighingsTable = (weighings: WeighingDetail[]) => {
    if (!weighings || weighings.length === 0) {
      return (
        <p className="text-gray-400 text-center mt-4">
          No hay pesajes registrados para esta orden.
        </p>
      );
    }

    return (
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Hora
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Bruto
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Neto
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tara Int.
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tara Ext.
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Bulto
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {weighings.map((w) => (
              <tr key={w.id} className="hover:bg-gray-700 transition-colors">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                  {w.id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {w.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {w.time.substring(0, 5)}
                </td>{" "}
                {/* Show HH:MM */}
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {formatKilos(w.grossWeight)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {formatKilos(w.netWeight)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {formatKilos(w.internalTare)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {formatKilos(w.externalTare)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {w.user.firstName} {w.user.lastName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {w.bale}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-green-400 mb-2">
            Cargando detalles de la orden...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-400 mb-2">
            Error al cargar la orden
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Volver a la lista de órdenes
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-yellow-400 text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-yellow-400 mb-2">
            Orden no encontrada
          </h2>
          <p className="text-gray-400 mb-6">
            No se encontraron detalles para la orden con ID: {id}.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Volver a la lista de órdenes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-400">
          Detalle de Orden: {order.orderNumber}
        </h1>
        <button
          onClick={() => navigate("/orders")}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center"
        >
          <ChevronLeft className="h-5 w-5 mr-2" /> Volver
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-4 border-b border-gray-700 pb-2">
          Información General
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            {renderDetailRow("ID", order.id)}
            {renderDetailRow("PPE", order.ppe)}
            {renderDetailRow("N° Orden", order.orderNumber)}
            {renderDetailRow("Partida Original", order.batchNumber)}
            {renderDetailRow("Fecha", order.date)}
            {renderDetailRow("Kilos Totales", formatKilos(order.kilos))}
            {renderDetailRow(
              "Kilos Procesados",
              formatKilos(order.processedKilos)
            )}
            {renderDetailRow("Kilos Pasados", formatKilos(order.passedKilos))}
          </div>
          <div className="space-y-2">
            {renderDetailRow("Cliente", order.client.name)}
            {renderDetailRow("Producto", order.product.name)}
            {renderDetailRow("Color", order.color.colorName)}
            {renderDetailRow("Denier", order.denier.denier)}
            {renderDetailRow("Tono", order.tone.name)}
            {renderDetailRow("Material", order.rawMaterial.name)}
            {renderDetailRow("Estado", order.status)}
            {renderDetailRow("Ciclo", order.cicle)}
          </div>
          <div className="space-y-2">
            {renderDetailRow("Fecha Fin", order.endDate || "N/A")}
            {renderDetailRow("Último KG", order.lastKG)}
            {renderDetailRow("Camión 1", order.firstTruck || "N/A")}
            {renderDetailRow("Camión 2", order.secondTruck || "N/A")}
            {renderDetailRow("Cancelada", order.isCanceled ? "Sí" : "No")}
            {renderDetailRow("Impresa", order.isPrinted ? "Sí" : "No")}
            {renderDetailRow(
              "Observaciones",
              order.observation || "Sin observaciones"
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4 border-b border-gray-700 pb-2">
          Pesajes Registrados
        </h2>
        {renderWeighingsTable(order.weighings)}
      </div>
    </div>
  );
};
