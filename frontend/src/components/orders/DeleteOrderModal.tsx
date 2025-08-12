"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../config/axiosInstance";

interface DeleteOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  orderNumber: number;
  onDeleteSuccess: () => void;
}

export const DeleteOrderModal = ({
  isOpen,
  onClose,
  orderId,
  orderNumber,
  onDeleteSuccess,
}: DeleteOrderModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await axiosInstance.delete(`orders/order/${orderId}`);
      onDeleteSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al eliminar la orden. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            Confirmar Eliminación
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={isDeleting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            ¿Estás seguro de que deseas eliminar la orden #{orderNumber}?
          </p>
          <p className="text-red-400 text-sm">
            Esta acción no se puede deshacer.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
