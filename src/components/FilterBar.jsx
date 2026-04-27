import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  const applyFilters = () => {
    onFilter({ make, year, type });
  };

  return (
    <div className="bg-white p-4 mb-6 rounded-xl shadow">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Marca"
          className="border p-2 rounded"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />

        <input
          type="text"
          placeholder="Ano"
          className="border p-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tipo (SUV, Sedan...)"
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <button
        onClick={applyFilters}
        className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}
