import Select from "react-select";
import type { SelectorsData } from "../../../types/orders";
import { LabelDisplay } from "../LabelDisplay";

interface MaterialFormFieldProps {
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

export const MaterialFormField = ({
  campo,
  index,
  isActive,
  register,
  errors,
  onKeyDown,
  selectorsData,
}: MaterialFormFieldProps) => {
  const renderField = () => {
    const baseClassName = `w-full px-2 py-1 sm:px-3 sm:py-2 bg-gray-900 border border-gray-600 rounded text-sm sm:text-base text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
      errors[campo.name] ? "border-red-500" : ""
    }`;

    switch (campo.type) {
      case "select": {
        let options: { value: number; label: string }[] = [];

        switch (campo.name) {
          case "clientId":
            options = selectorsData.clients.map((c) => ({
              value: c.id,
              label: c.name.toUpperCase(),
            }));
            break;
          case "rawMaterialId":
            options = selectorsData.rawMaterials.map((rM) => ({
              value: rM.id,
              label: rM.name.toUpperCase(),
            }));
            break;
          case "colorId":
            options = selectorsData.colors.map((c) => ({
              value: c.id,
              label: c.colorName.toUpperCase(),
            }));
            break;
        }

        return (
          <Select
            options={options}
            placeholder={`Seleccione ${campo.label}`}
            classNamePrefix="react-select"
            autoFocus={isActive}
            // Integración con react-hook-form:
            {...register(campo.name, {
              required: `${campo.label} es requerido`,
              valueAsNumber: true,
              validate: (value: number) =>
                value > 0 || `Debe seleccionar un ${campo.label.toLowerCase()}`,
            })}
            // Controlar el valor y cambios manualmente
            onChange={(selectedOption: any) => {
              const value = selectedOption ? selectedOption.value : 0;
              // actualizar react-hook-form
              register(campo.name).onChange({
                target: { name: campo.name, value },
              });
            }}
            // Estilos: limitar altura del menú
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 150,
                backgroundColor: "#111827", // bg-gray-900
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: "#111827",
                borderColor: errors[campo.name] ? "#f87171" : "#374151",
                color: "white",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#2563eb" // azul (tailwind blue-600)
                  : state.isFocused
                  ? "#374151" // gris más claro al hacer hover
                  : "#111827", // fondo normal
                color: state.isSelected ? "white" : "white", // texto siempre blanco
                cursor: "pointer",
              }),
            }}
            isSearchable // habilita búsqueda
          />
        );
      }
      case "date":
        return (
          <div className="relative">
            <input
              {...register(campo.name, {
                required: `${campo.label} es requerido`,
              })}
              type="date"
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`${baseClassName} date-input`}
              autoFocus={isActive}
            />
            <style>{`
              .date-input::-webkit-calendar-picker-indicator {
                filter: invert(1);
                cursor: pointer;
                opacity: 0.8;
              }
              .date-input::-webkit-calendar-picker-indicator:hover {
                opacity: 1;
              }
              .date-input::-webkit-datetime-edit {
                color: white;
              }
              .date-input::-webkit-datetime-edit-fields-wrapper {
                color: white;
              }
              .date-input::-webkit-datetime-edit-text {
                color: white;
              }
              .date-input::-webkit-datetime-edit-month-field {
                color: white;
              }
              .date-input::-webkit-datetime-edit-day-field {
                color: white;
              }
              .date-input::-webkit-datetime-edit-year-field {
                color: white;
              }
            `}</style>
          </div>
        );
      case "number":
        return (
          <input
            {...register(campo.name, {
              required: `${campo.label} es requerido`,
              setValueAs: (value: string) => {
                if (value === "" || value === null || value === undefined) {
                  return undefined;
                }
                const numValue = Number.parseFloat(value);
                return isNaN(numValue) ? undefined : numValue;
              },
              validate: (value: number | undefined) => {
                if (
                  value === undefined ||
                  value === null ||
                  isNaN(value) ||
                  value <= 0
                ) {
                  return `${campo.label} debe ser mayor a 0`;
                }
                return true;
              },
            })}
            type="number"
            step={campo.name === "kilos" ? "0.01" : "1"}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={baseClassName}
            autoFocus={isActive}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
          />
        );
      default: // text
        return (
          <input
            {...register(campo.name, {
              required: `${campo.label} es requerido`,
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
        message={`${campo.label} *`}
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
