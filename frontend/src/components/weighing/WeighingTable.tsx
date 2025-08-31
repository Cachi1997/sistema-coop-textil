interface Weighing {
  id: number;
  date: string;
  time: string;
  netWeight: string;
  batch: number;
  bale: number;
  order: {
    orderNumber: number;
    batchNumber: number;
    product: { name: string };
    client: { name: string };
    color: { idColor: string; colorName: string };
    denier: { denier: string };
    tone: { name: string };
    rawMaterial: { name: string };
  };
}

interface WeighingsTableProps {
  data: Weighing[];
}

const WeighingTable: React.FC<WeighingsTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
        No se encontraron pesajes.
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Hora
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Peso neto
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Lote
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Fardo
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Orden
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Partida
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  ID Color
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Nombre Color
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Denier
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Tono
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Materia Prima
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((w) => (
                <tr key={w.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {w.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.time}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.netWeight}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.batch}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.bale}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.orderNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.batchNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.product?.name ?? "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.client?.name ?? "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.color?.idColor ?? "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.color?.colorName ?? "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.denier?.denier ?? "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.tone?.name ?? "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {w.order.rawMaterial?.name ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WeighingTable;
