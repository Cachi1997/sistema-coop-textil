import { useTachasList } from "../hooks/useTachasList";

export const TachasListPage = () => {
  const {
    tachas,
    isLoading,
    error,
    successMessage,
    hasSearched,
    filters,
    truckOptions,
    sectionOptions,
    selectorsData,
    isLoadingSelectors,
    selectorsError,
    updateFilter,
    fetchTachas,
    toggleDispatched,
    saveDispatchedData,
  } = useTachasList();

  const handleSubmit = () => {
    fetchTachas();
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Lista de Tachas</h1>

        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Campo de fecha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => updateFilter("date", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                style={{ colorScheme: "dark", filter: "invert(0.1)" }}
              />
            </div>

            {/* Select de cliente */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Cliente
              </label>
              <select
                value={filters.clientId}
                onChange={(e) =>
                  updateFilter("clientId", Number.parseInt(e.target.value))
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoadingSelectors}
              >
                <option value={0}>Seleccione Cliente</option>
                {selectorsData.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Select de camiones */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Camiones
              </label>
              <select
                value={filters.truck}
                onChange={(e) => updateFilter("truck", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccione Camión</option>
                {truckOptions.map((truck) => (
                  <option key={truck.value} value={truck.value}>
                    {truck.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Select de sección */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Sección
              </label>
              <select
                value={filters.section}
                onChange={(e) => updateFilter("section", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccione Sección</option>
                {sectionOptions.map((section) => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón enviar */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading || filters.clientId === 0 || !filters.truck}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Cargando..." : "Enviar"}
            </button>
          </div>
        </div>

        {/* Mensajes de error */}
        {selectorsError && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
            Error al cargar selectores: {selectorsError}
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Mensajes de éxito */}
        {successMessage && (
          <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {hasSearched && (
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Resultados ({tachas.length} tachas encontradas)
              </h2>
              {tachas.length > 0 && (
                <button
                  onClick={saveDispatchedData}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              )}
            </div>

            {tachas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Lote
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Nº Fardo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Kilos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Denier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Lustre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Denier Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Remitido
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {tachas.map((tacha) => (
                      <tr key={tacha.id} className="hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.batch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.baleNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.baleKilos} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.denier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.luster}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.totalDenier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {tacha.rawMaterial.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          <input
                            type="checkbox"
                            checked={tacha.dispatched}
                            onChange={() =>
                              toggleDispatched(tacha.id, tacha.dispatched)
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-gray-400">
                No se encontraron tachas para los criterios seleccionados
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
