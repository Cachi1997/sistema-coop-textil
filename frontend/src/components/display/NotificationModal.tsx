import { useEffect } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number; // Opcional: para auto-cerrar después de un tiempo
}

export const NotificationModal = ({
  isOpen,
  title,
  message,
  type,
  onClose,
  duration,
}: NotificationModalProps) => {
  // Auto-cerrar si se especifica una duración
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  let headerBgClass = "";
  let borderClass = "";
  let icon = "";
  let iconBgClass = "";
  let iconTextColorClass = "";

  switch (type) {
    case "success":
      headerBgClass = "bg-green-600";
      borderClass = "border-green-500";
      icon = "✓";
      iconBgClass = "bg-white";
      iconTextColorClass = "text-green-600";
      break;
    case "error":
      headerBgClass = "bg-red-600";
      borderClass = "border-red-500";
      icon = "!";
      iconBgClass = "bg-white";
      iconTextColorClass = "text-red-600";
      break;
    case "info":
      headerBgClass = "bg-blue-600";
      borderClass = "border-blue-500";
      icon = "i";
      iconBgClass = "bg-white";
      iconTextColorClass = "text-blue-600";
      break;
    default:
      headerBgClass = "bg-gray-600";
      borderClass = "border-gray-500";
      icon = "?";
      iconBgClass = "bg-white";
      iconTextColorClass = "text-gray-600";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80" />

      {/* Modal */}
      <div
        className={`relative bg-gray-800 border-4 ${borderClass} rounded-lg shadow-2xl max-w-md w-full mx-4`}
      >
        {/* Header */}
        <div
          className={`${headerBgClass} px-4 py-3 sm:px-6 sm:py-4 rounded-t-lg flex justify-between items-center`}
        >
          <div className="flex items-center">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 ${iconBgClass} rounded-full flex items-center justify-center mr-2 sm:mr-3`}
            >
              <span
                className={`font-bold text-lg sm:text-xl ${iconTextColorClass}`}
              >
                {icon}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        {/* Contenido */}
        <div className="px-4 py-4 sm:px-6 sm:py-6">
          <div className="text-white text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};
