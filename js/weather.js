
async function fetchWeatherData() {
    const apiKey = "ab307eff2b39020327ee83788a7205d7";
    const city = "Cagliari";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const weatherDescription = data.weather[0].description;
        const icon = data.weather[0].icon;

        document.getElementById("weather").innerHTML = `
            <img id="weather_icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
            <p id="temperature">${temperature}°C</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather").innerHTML = `<p>Failed to load weather data.</p>`;
    }
}

fetchWeatherData();
setInterval(fetchWeatherData, 3600000);