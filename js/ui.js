const status = document.getElementById("status");
const weather = document.getElementById("weather-result");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("weather-icon");
const loader = document.getElementById("loader");

export function showLoading() {
  loader.classList.remove("hidden");
  weather.classList.add("hidden");
  status.textContent = "";
}

export function hideLoading() {
  loader.classList.add("hidden");
}

export function showError(message) {
  status.textContent = message;
  weather.classList.add("hidden");
}

export function renderWeather(data) {
  status.textContent = "";
  weather.classList.remove("hidden");

  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  description.textContent = data.weather[0].description;

  const iconCode = data.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  icon.alt = data.weather[0].description;

  hideLoading();
}

export function updateBackground(weatherDesc) {
  let bgImage = '';

  if (weatherDesc.includes('cloud')) {
    bgImage = 'images/nublado.png';
  } else if (weatherDesc.includes('rain') || weatherDesc.includes('drizzle')) {
    bgImage = 'images/lluvioso.png';
  } else if (weatherDesc.includes('clear')) {
    bgImage = 'images/despejado.png';
  } else if (weatherDesc.includes('night')) {
    bgImage = 'images/noche.png';
  } else {
    bgImage = 'images/soleado.png';
  }

  document.body.style.backgroundImage = `url('${bgImage}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.transition = 'background 1s ease-in-out';
}


