import { useEffect } from "react";

interface ErrorModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const ErrorModal = ({
  isOpen,
  title,
  message,
  onClose,
}: ErrorModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay - fondo opaco pero visible */}
      <div className="absolute inset-0 bg-black bg-opacity-80" />

      {/* Modal */}
      <div className="relative bg-gray-800 border-4 border-red-500 rounded-lg shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="bg-red-500 px-4 py-3 sm:px-6 sm:py-4 ">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center mr-2 sm:mr-3">
              <span className="text-red-600 font-bold text-lg sm:text-xl">
                !
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-4 py-4 sm:px-6 sm:py-6">
          <div className="text-white text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {message}
          </div>
        </div>

        {/* Barra de progreso simple */}
        <div className="bg-gray-700 h-1 sm:h-2 rounded-b-lg overflow-hidden">
          <div
            className="bg-red-500 h-full"
            style={{
              animation: "progress 3s linear forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};
