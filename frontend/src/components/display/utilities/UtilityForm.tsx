import { useState } from "react";
import type { UtilityConfig, UtilityItem } from "../../../hooks/useUtilities";

interface UtilityFormProps {
  config: UtilityConfig;
  onSubmit: (data: Partial<UtilityItem>) => Promise<void>;
  isCreating: boolean;
  onCancel: () => void;
  options?: any;
}

export const UtilityForm = ({
  config,
  onSubmit,
  isCreating,
  onCancel,
  options,
}: UtilityFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({});
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Crear {config.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {field.label}{" "}
                {field.required && <span className="text-red-400">*</span>}
              </label>
              {field.type === "select" ? (
                <select
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar...</option>
                  {field.key === "clientId" &&
                    options?.clients?.map((client: any) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  type={
                    field.type === "number"
                      ? "number"
                      : field.type === "color"
                      ? "color"
                      : "text"
                  }
                  value={formData[field.key] || ""}
                  onChange={(e) =>
                    handleChange(
                      field.key,
                      field.type === "number"
                        ? Number(e.target.value)
                        : e.target.value
                    )
                  }
                  required={field.required}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isCreating}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isCreating ? "Creando..." : "Crear"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
