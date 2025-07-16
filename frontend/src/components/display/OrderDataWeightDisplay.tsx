import type { orderWeightResponse } from "../../types";

interface OrderDataWeightDisplayProps {
  orderData: orderWeightResponse | null;
}

export const OrderDataWeightDisplay = ({
  orderData,
}: OrderDataWeightDisplayProps) => {
  return (
    <>
      <div className="space-y-1 text-xs sm:space-y-2 sm:text-sm">
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">PPE:</span>
          <span className="font-mono">{orderData?.ppe}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Partida:</span>
          <span className="font-mono">{orderData?.batchNumber}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Id Color:</span>
          <span className="font-mono">{orderData?.idColor}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Color:</span>
          <span className="font-mono">{orderData?.color}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Lustre:</span>
          <span className="font-mono">{orderData?.denier}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Tono:</span>
          <span className="font-mono">{orderData?.tone}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Origen:</span>
          <span className="font-mono">{orderData?.material}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Producto:</span>
          <span className="font-mono">{orderData?.product}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span className="font-medium text-gray-300">Cliente:</span>
          <span className="font-mono">{orderData?.client}</span>
        </div>
      </div>
    </>
  );
};
