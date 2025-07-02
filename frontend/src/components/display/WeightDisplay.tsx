type WeightDisplayProps = {
  grossWeight: number | null;
  netWeight: number | null;
};

const WeightDisplay: React.FC<WeightDisplayProps> = ({
  grossWeight,
  netWeight,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <div className="bg-black border-4 border-green-500 rounded-lg p-6 text-center w-full">
        <div className="text-5xl font-mono text-green-400 mb-2">
          {grossWeight !== null
            ? grossWeight.toFixed(2) + " kg"
            : "Cargando..."}
        </div>
        <p className="text-lg text-green-300">Peso bruto</p>
      </div>
      <div className="bg-black border-4 border-blue-500 rounded-lg p-6 text-center w-full">
        <div className="text-5xl font-mono text-blue-400 mb-2">
          {netWeight !== null ? netWeight.toFixed(2) + " kg" : "-"}
        </div>
        <p className="text-lg text-blue-300">Peso neto</p>
      </div>
    </div>
  );
};

export default WeightDisplay;
