const APIKEY = '16034a6c13814a2f9f6115058242309';
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const temp = document.getElementById("temp"); // Added for displaying temperature
const outputCard = document.getElementById("outputCard");

async function getData(APIKEY, cityInput) {
   const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${cityInput}&aqi=yes`);
   return await promise.json();
}

searchBtn.addEventListener('click', async () => {
    const input = cityInput.value;
    const result = await getData(APIKEY, input);
    
    if (result && result.location && result.current) {
        // Display the city, country, and temperature details
        cityName.innerText = `${result.location.name}, ${result.location.region}`;
        countryName.innerText = `${result.location.country}`;
        temp.innerText = `${result.current.temp_c}°C`;

        // Make the output card visible
        outputCard.style.visibility = "visible";
    } else {
        alert("City not found. Please try again.");
    }
});
