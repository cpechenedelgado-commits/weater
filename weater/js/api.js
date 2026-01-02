export const API_KEY = "af317d9aaeb8a86ac2cb4363d6ff1e27";

export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Ciudad no encontrada");
  }

  return response.json();
}
