import { getWeather } from "./api.js";
import { showLoading, hideLoading, showError, renderWeather, updateBackground } from "./ui.js";
import { saveCity, getSavedCity } from "./storage.js";

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const toggleBtn = document.getElementById("toggle-unit");
const temperatureEl = document.getElementById("temperature");

let currentTemp = null;
let isCelsius = true;

// Función para mostrar el clima y actualizar fondo
async function showWeatherData(city) {
  showLoading();

  try {
    const data = await getWeather(city);

    renderWeather(data);
    updateBackground(data.weather[0].description.toLowerCase());

    currentTemp = data.main.temp;
    isCelsius = true;
    toggleBtn.textContent = "Cambiar a °F";
    toggleBtn.classList.remove("hidden");

    saveCity(city);
    input.value = "";
  } catch (error) {
    showError(error.message);
    hideLoading();
  }
}

// Evento de búsqueda
form.addEventListener("submit", e => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) showWeatherData(city);
});

// Toggle °C / °F
toggleBtn.addEventListener("click", () => {
  if (currentTemp === null) return;

  if (isCelsius) {
    temperatureEl.textContent = `${Math.round(currentTemp * 9 / 5 + 32)} °F`;
    toggleBtn.textContent = "Cambiar a °C";
  } else {
    temperatureEl.textContent = `${Math.round(currentTemp)} °C`;
    toggleBtn.textContent = "Cambiar a °F";
  }

  isCelsius = !isCelsius;
});

// Cargar última ciudad al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const savedCity = getSavedCity();
  if (savedCity) {
    showWeatherData(savedCity);
  }
});




