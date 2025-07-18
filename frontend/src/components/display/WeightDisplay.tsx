interface WeightDisplayProps {
  grossWeight: number | null;
  netWeight: number | null;
}

export default function WeightDisplay({
  grossWeight,
  netWeight,
}: WeightDisplayProps) {
  return (
    <div className="flex flex-col flex-grow justify-center items-center space-y-2">
      <div className="w-full text-center mb-2">
        <span className="text-xs sm:text-sm text-gray-400">PESO BRUTO</span>
      </div>
      <div className="bg-black border-2 sm:border-4 border-green-500 rounded-lg p-2 sm:p-6 text-center w-full">
        <div className="text-3xl sm:text-4xl font-mono text-green-400 mb-1">
          {grossWeight !== null ? grossWeight.toFixed(2) : "0.00"}
        </div>
        <div className="text-base sm:text-lg text-green-300">KG</div>
      </div>

      <div className="w-full text-center mt-4 mb-2">
        <span className="text-xs sm:text-sm text-gray-400">PESO NETO</span>
      </div>
      <div
        className={`bg-black border-2 sm:border-4 rounded-lg p-2 sm:p-6 text-center w-full ${
          netWeight !== null && netWeight < 0
            ? "border-red-500"
            : "border-blue-500"
        }`}
      >
        <div
          className={`text-3xl sm:text-4xl font-mono mb-1 ${
            netWeight !== null && netWeight < 0
              ? "text-red-400"
              : "text-blue-400"
          }`}
        >
          {netWeight !== null ? netWeight.toFixed(2) : "0.00"}
        </div>
        <div
          className={`text-base sm:text-lg ${
            netWeight !== null && netWeight < 0
              ? "text-red-300"
              : "text-blue-300"
          }`}
        >
          KG
        </div>
      </div>
    </div>
  );
}
