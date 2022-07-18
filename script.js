// API key for OpenWeatherMap
const API_KEY = '60740092069bb5425f8faee7a633f49d';
// function to obtain user location and fetch weather data from OpenWeatherMap api
const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch (`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
    console.log(position);
}

// objeto con los datos del clima que se obtienen de la API

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: 'data',
    }
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });
}


// Asking for permission to access user location    
const onLoad = () => {
        navigator.geolocation.getCurrentPosition(fetchData);
    }

