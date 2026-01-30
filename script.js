// const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/json'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

// const apiKey = "9f8c81385974e4575bbad20974081352";
// const city = "Delhi";

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

// async function getWeather() {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     document.getElementById("weather").innerText =
//       `Temperature in ${city}: ${data.main.temp}°C`;
//   } catch (error) {
//     console.error(error);
//   }
// }

// getWeather();






// Add this function (you can paste it right here)
function toTitleCase(str) {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}



// Default starting city
let currentCity = "Delhi";

// Your API key
const apiKey = "9f8c81385974e4575bbad20974081352";
const units = "metric";

// Function to fetch and display weather for a given city
async function getWeather(city) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(response.status === 404 ? "City not found" : "API error");
    }

    const data = await response.json();

    // Filter today's forecast entries
    const todayItems = data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      return date.getDate() === new Date().getDate();
    });

    if (todayItems.length === 0) throw new Error("No data for today");

    const temps = todayItems.map(item => item.main.temp);
    const minTemp = Math.min(...temps).toFixed(1);
    const maxTemp = Math.max(...temps).toFixed(1);
    const currentTemp = data.list[0].main.temp.toFixed(1); // Latest reading

    // Update cards
    document.getElementById("current-temp").textContent = `${currentTemp}°C`;
    document.getElementById("min-temp").textContent     = `${minTemp}°C`;
    document.getElementById("max-temp").textContent     = `${maxTemp}°C`;

    // Update heading (only city name)
    document.getElementById("weather").textContent = `Temperature in ${city}`;

    // Get current weather snapshot (most recent from forecast list)
const currentWeather = data.list[0];

// Update table fields
document.getElementById("description").textContent = 
  currentWeather.weather[0].description.charAt(0).toUpperCase() + 
  currentWeather.weather[0].description.slice(1);  // e.g. "clear sky" → "Clear sky"

document.getElementById("humidity").textContent    = `${currentWeather.main.humidity}%`;
document.getElementById("windSpeed").textContent   = `${currentWeather.wind.speed} m/s`;
document.getElementById("pressure").textContent    = `${currentWeather.main.pressure} hPa`;
document.getElementById("clouds").textContent      = `${currentWeather.clouds.all}%`;




    console.log(`Weather for ${city}:`, { current: currentTemp, min: minTemp, max: maxTemp });
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("weather").textContent = `Error: ${error.message}`;
    document.getElementById("current-temp").textContent = "—";
    document.getElementById("min-temp").textContent     = "—";
    document.getElementById("max-temp").textContent     = "—";
    document.getElementById("description").textContent = "—";
document.getElementById("humidity").textContent    = "—";
document.getElementById("windSpeed").textContent   = "—";
document.getElementById("pressure").textContent    = "—";
document.getElementById("clouds").textContent      = "—";
  }
}

// Load default city on page load
getWeather(currentCity);

// Handle search form submission
document.getElementById("citySearchForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let newCity = document.getElementById("cityInput").value.trim();
  
  if (!newCity) return;

  // Capitalize the city name properly (e.g. "new delhi" → "New Delhi")
  newCity = toTitleCase(newCity);

  if (newCity !== currentCity) {
    currentCity = newCity;
    getWeather(currentCity);
    document.getElementById("cityInput").value = ""; // clear input
  }
});