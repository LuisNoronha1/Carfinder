export default function ComparePanel({ cars }) {
  if (cars.length === 0) return null;

  return (
    <div className="mt-8 bg-white p-4 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Comparação</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="border p-3 rounded-xl">
            <h3 className="font-bold text-lg">{car.make} {car.model}</h3>
            <p>Ano: {car.year}</p>
            <p>Motor: {car.engine}</p>
            <p>Transmissão: {car.transmission}</p>
            <p>Combustível: {car.fuel_type}</p>
            <p>Categoria: {car.class}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
