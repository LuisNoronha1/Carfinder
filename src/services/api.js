export async function fetchCars() {
  const response = await fetch("https://myfakeapi.com/api/cars/");
  const data = await response.json();
  return data.cars;
}
