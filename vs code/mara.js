const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weather-info");

searchButton.addEventListener("click", function () {
    const cityName = cityInput.value;
    if (cityName) {
        getWeatherData(cityName);
    }
});

async function getWeatherData(city) {
    const apiKey = "3c45def23e41234416320ad372e6f133"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  // Fixed template literal

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weatherInfo.innerHTML = `<p>City not found! Please try again.</p>`;  // Fixed the error message with quotes
        } else {
            const weather = data.weather[0];
            const main = data.main;
            const wind = data.wind;

            const output = `
                <p class="city-name">${data.name}, ${data.sys.country}</p>
                <p class="temp">${main.temp}°C</p>
                <p class="description">${weather.description}</p>
                <p class="humidity">Humidity: ${main.humidity}%</p>
                <p class="wind">Wind Speed: ${wind.speed} m/s</p>
            `;

            weatherInfo.innerHTML = output;
        }
    } catch (error) {
        weatherInfo.innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;  // Fixed the error message with quotes
    }
}
