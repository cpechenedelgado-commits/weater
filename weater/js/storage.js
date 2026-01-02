const STORAGE_KEY = "lastCity";

export function saveCity(city) {
  localStorage.setItem(STORAGE_KEY, city);
}

export function getSavedCity() {
  return localStorage.getItem(STORAGE_KEY);
}
