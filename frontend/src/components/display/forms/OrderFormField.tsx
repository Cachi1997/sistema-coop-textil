import type { SelectorsData } from "../../../types/orders";
import { LabelDisplay } from "../LabelDisplay";

interface OrderFormFieldProps {
  campo: {
    name: string;
    label: string;
    type: string;
  };
  index: number;
  isActive: boolean;
  register: any;
  errors: any;
  onKeyDown: (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => void;
  selectorsData: SelectorsData;
}

export const OrderFormField = ({
  campo,
  index,
  isActive,
  register,
  errors,
  onKeyDown,
  selectorsData,
}: OrderFormFieldProps) => {
  const renderField = () => {
    const baseClassName = `w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-900 border border-gray-600 rounded text-sm sm:text-base text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
      errors[campo.name] ? "border-red-500" : ""
    }`;

    switch (campo.type) {
      case "select":
        let options: { id: number; name: string; display?: string }[] = [];

        switch (campo.name) {
          case "clientId":
            options = selectorsData.clients.map((c) => ({
              id: c.id,
              name: c.name,
              display: `${c.name.toUpperCase()}`,
            }));
            break;
          case "denierId":
            options = selectorsData.deniers.map((d) => ({
              id: d.id,
              name: d.denier.toString(),
              display: `${d.denier.toUpperCase()}`,
            }));
            break;
          case "toneId":
            options = selectorsData.tones.map((t) => ({
              id: t.id,
              name: t.name,
              display: `${t.name.toUpperCase()}`,
            }));
            break;
          case "productId":
            options = selectorsData.products.map((p) => ({
              id: p.id,
              name: p.name,
              display: `${p.name.toUpperCase()}`,
            }));
            break;
          case "colorId":
            options = selectorsData.colors.map((c) => ({
              id: c.id,
              name: c.colorName,
              display: `${c.colorName.toUpperCase()}`,
            }));
            break;
          case "rawMaterialId":
            options = selectorsData.rawMaterials.map((rM) => ({
              id: rM.id,
              name: rM.name,
              display: `${rM.name.toUpperCase()}`,
            }));
            break;
        }

        return (
          <select
            {...register(campo.name, {
              required: `${campo.label} es requerido`,
              valueAsNumber: true,
            })}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={baseClassName}
            autoFocus={isActive}
          >
            <option value={0}>Seleccione {campo.label}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.display || option.name}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            {...register(campo.name)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={`${baseClassName} min-h-[80px] resize-vertical`}
            autoFocus={isActive}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
            rows={3}
          />
        );

      case "date":
        return (
          <input
            {...register(campo.name, {
              required: `${campo.label} es requerido`,
            })}
            type="date"
            onKeyDown={(e) => onKeyDown(e, index)}
            className={baseClassName}
            autoFocus={isActive}
          />
        );

      case "number":
        return (
          <input
            {...register(campo.name, {
              required:
                campo.name !== "kilosPasados"
                  ? `${campo.label} es requerido`
                  : false,
              valueAsNumber: true,
              min: { value: 0, message: "Debe ser mayor o igual a 0" },
            })}
            type="number"
            step={campo.name.includes("kilos") ? "0.01" : "1"}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={baseClassName}
            autoFocus={isActive}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
            readOnly={campo.name === "ppe"} // PPE es solo lectura
          />
        );

      default: // text
        return (
          <input
            {...register(campo.name, {
              required:
                campo.name !== "camiones" && campo.name !== "observaciones"
                  ? `${campo.label} es requerido`
                  : false,
            })}
            type="text"
            onKeyDown={(e) => onKeyDown(e, index)}
            className={baseClassName}
            autoFocus={isActive}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div
      className={`p-2 rounded border transition-all ${
        isActive
          ? "border-green-500 bg-gray-700 shadow-md"
          : "border-gray-600 bg-gray-750"
      }`}
    >
      <LabelDisplay
        message={`${campo.label}${campo.name === "ppe" ? " (Auto)" : ""}`}
        className="block text-sm font-medium mb-1 text-gray-300"
      />
      {renderField()}
      {errors[campo.name] && (
        <span className="text-red-400 text-xs mt-1 block">
          {errors[campo.name]?.message || "Este campo es obligatorio"}
        </span>
      )}
    </div>
  );
};
