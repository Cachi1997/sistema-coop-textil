import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUtilities } from "../hooks/useUtilities";
import { UtilityForm } from "../components/display/utilities/UtilityForm";
import { utilityConfigs } from "../utils/utilityConfig";
import { useSelectorsData } from "../hooks/useSelectorsData";

export const UtilityPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const config = utilityConfigs[type];
  const { selectorsData } = useSelectorsData();

  const {
    items,
    isLoading,
    error,
    successMessage,
    isCreating,
    createItem,
    clearMessages,
  } = useUtilities(config);

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">
            Tipo de utilidad no encontrado
          </h1>
          <button
            onClick={() => navigate("/utilities")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Volver a Utilidades
          </button>
        </div>
      </div>
    );
  }

  const handleCreate = async (data: any) => {
    try {
      await createItem(data);
      setShowForm(false);
    } catch (err) {
      // Error ya manejado en el hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{config.title}</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {showForm ? "Cancelar" : `Crear ${config.title}`}
          </button>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {showForm && (
          <UtilityForm
            config={config}
            onSubmit={handleCreate}
            isCreating={isCreating}
            onCancel={() => setShowForm(false)}
            options={selectorsData}
          />
        )}

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Lista de {config.title}</h2>
          </div>

          {isLoading ? (
            <div className="p-6 text-center">
              <div className="text-gray-400">
                Cargando {config.title.toLowerCase()}...
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-gray-400">
                No hay {config.title.toLowerCase()} registrados
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    {config.fields.map((field) => (
                      <th
                        key={field.key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        {field.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.id}
                      </td>
                      {config.fields.map((field) => (
                        <td
                          key={field.key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                        >
                          {field.type === "color" && item[field.key] ? (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border border-gray-600"
                                style={{
                                  backgroundColor: item[field.key] as string,
                                }}
                              />
                              {item[field.key]}
                            </div>
                          ) : (
                            item[field.key] || "-"
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
