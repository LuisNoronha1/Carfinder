import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import VehicleCard from "../components/VehicleCard";
import Modal from "../components/Modal";
import { carsData } from "../data/cars";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [selectedCar, setSelectedCar] = useState(null);
  const [compareCars, setCompareCars] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setCars(carsData);
    setFilteredCars(carsData);
  }, []);

  useEffect(() => {
    const result = cars.filter((c) =>
      `${c.make} ${c.model} ${c.class}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredCars(result);
  }, [search, cars]);

  const handleFilter = (filters) => {
    let result = cars;

    if (filters.make) {
      result = result.filter((c) =>
        c.make.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.year) {
      result = result.filter((c) => c.year.toString() === filters.year);
    }

    if (filters.body_type) {
      result = result.filter((c) =>
        c.class.toLowerCase().includes(filters.body_type.toLowerCase())
      );
    }

    setFilteredCars(result);
  };

  const handleCompare = (car) => {
    if (!compareCars.find((c) => c.id === car.id) && compareCars.length < 2) {
      setCompareCars([...compareCars, car]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareCars(compareCars.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
       e ache o carro perfeito para você!
      </h1>

      {/* Pesquisa rápida */}
      <input
        type="text"
        placeholder="Pesquisar por marca, modelo ou categoria..."
        className="w-full mb-4 p-3 rounded-lg border"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FilterBar onFilter={handleFilter} />

      {/* Painel flutuante de comparação */}
      {compareCars.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-xl p-4 w-72 z-50">
          <h3 className="font-bold mb-2">Comparação</h3>

          {compareCars.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center text-sm mb-2"
            >
              <span>{c.make} {c.model}</span>
              <button
                onClick={() => removeFromCompare(c.id)}
                className="text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() => setIsCompareOpen(true)}
            className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Abrir Comparação
          </button>
        </div>
      )}

      {/* Grid de carros */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredCars.map((car) => (
          <VehicleCard
            key={car.id}
            car={car}
            onAnalyze={() => setSelectedCar(car)}
            onCompare={() => handleCompare(car)}
          />
        ))}
      </div>

      {/* Modal de análise */}
      {selectedCar && (
        <Modal
          title="Análise do Veículo"
          onClose={() => setSelectedCar(null)}
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Marca:</strong> {selectedCar.make}</div>
            <div><strong>Modelo:</strong> {selectedCar.model}</div>
            <div><strong>Ano:</strong> {selectedCar.year}</div>
            <div><strong>Categoria:</strong> {selectedCar.class}</div>
            <div><strong>Combustível:</strong> {selectedCar.fuel_type}</div>
            <div><strong>Motor:</strong> {selectedCar.engine}</div>
            <div><strong>Câmbio:</strong> {selectedCar.transmission}</div>
            <div><strong>0–100 km/h:</strong> {selectedCar.zero_to_100}s</div>
            <div><strong>Consumo:</strong> {selectedCar.avg_consumption} km/l</div>
          </div>
        </Modal>
      )}

      {/* Modal de comparação */}
      {isCompareOpen && (
        <Modal
          title="Comparação de Veículos"
          onClose={() => setIsCompareOpen(false)}
        >
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Característica</th>
                {compareCars.map((c) => (
                  <th key={c.id} className="border p-2">
                    {c.make} {c.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Ano", "year"],
                ["Categoria", "class"],
                ["Combustível", "fuel_type"],
                ["Motor", "engine"],
                ["Câmbio", "transmission"],
                ["0–100 km/h", "zero_to_100"],
                ["Consumo (km/l)", "avg_consumption"],
              ].map(([label, key]) => (
                <tr key={key}>
                  <td className="border p-2">{label}</td>
                  {compareCars.map((c) => (
                    <td key={c.id} className="border p-2">
                      {c[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}
    </div>
  );
}