export default function VehicleCard({ car, onAnalyze, onCompare }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
      <h2 className="text-xl font-bold mb-1">
        {car.make} {car.model}
      </h2>

      <p className="text-gray-500 mb-3">
        {car.year} • {car.class}
      </p>

      <div className="text-sm space-y-1 mb-4">
        <p><strong>Motor:</strong> {car.engine}</p>
        <p><strong>0–100:</strong> {car.zero_to_100}s</p>
        <p><strong>Consumo:</strong> {car.avg_consumption} km/l</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAnalyze}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
        >
          Analisar
        </button>

        <button
          onClick={onCompare}
          className="flex-1 bg-gray-700 text-white py-2 rounded-lg"
        >
          Comparar
        </button>
      </div>
    </div>
  );
}