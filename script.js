
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const currentTemp = document.querySelector("#current-temp");
const currentDate = document.querySelector("#current-date");
const currentCity = document.querySelector("#current-city");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const sunset = document.querySelector("#sunset");
const sunrise = document.querySelector("#sunrise");
const clouds = document.querySelector("#clouds");
const uvIndex = document.querySelector("#uv-index");
const pressure = document.querySelector("#pressure");
const feelsLike = document.querySelector("#feels-like");
const visibility = document.querySelector("#visibility");
const forecastTable = document.querySelector("#forecast-table");

const APIKEY = '16034a6c13814a2f9f6115058242309';

// Function to fetch weather data
async function fetchWeather(city) {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=7&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        
        // Update the UI with the fetched data
        updateUI(data);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Function to update UI with fetched weather data


function updateUI(data) {
    currentTemp.textContent = `${data.current.temp_c}°C`; // Current temperature
    currentCity.textContent = `${data.location.name}, ${data.location.country}`; // Current city and country
    currentDate.textContent = new Date(data.location.localtime).toLocaleString(); // Local date and time
    humidity.textContent = `${data.current.humidity}%`; // Humidity
    windSpeed.textContent = `${data.current.wind_kph} km/h`; // Wind speed
    sunset.textContent = data.forecast.forecastday[0].astro.sunset; // Sunset time
    sunrise.textContent = data.forecast.forecastday[0].astro.sunrise; // Sunrise time
    clouds.textContent = `${data.current.cloud}%`; // Cloud cover
    uvIndex.textContent = data.current.uv; // UV Index
    pressure.textContent = `${data.current.pressure_mb} hPa`; // Pressure
    feelsLike.textContent = `${data.current.feelslike_c}°C`; // Feels like
    visibility.textContent = `${data.current.vis_km} km`; // Visibility




    // Update the forecast section
    for (let i = 0; i < 7; i++) {
        const day = new Date(data.forecast.forecastday[i].date).toLocaleDateString('en-US', { weekday: 'long' });
        document.querySelector(`#day${i + 1}`).textContent = day;
        document.querySelector(`#temp${i + 1}`).textContent = `${data.forecast.forecastday[i].day.avgtemp_c}°C`;
        document.querySelector(`#icon${i + 1}`).src = data.forecast.forecastday[i].day.condition.icon; // Update icon based on weather condition
    }
}


// Event listener for the search button
searchButton.addEventListener("click", function() {
    const cityName = cityInput.value.trim(); 
    if (cityName) {
        fetchWeather(cityName); 
    } else {
        alert('Please enter a city name');
    }
});
