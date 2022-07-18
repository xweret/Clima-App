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
        date: getDate(),
    }
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanerUp();
}

// Al finalizar la carga de los datos de la apy llamamos a cleaner up
// Cleaner up es una funcion que se ejecuta cuando termina de cargar los datos, oculta el loader y muestra el contenedor

const cleanerUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');
        loader.style.display = 'none';
        container.style.display = 'flex';
    }

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
}


// Asking for permission to access user location    
const onLoad = () => {
        navigator.geolocation.getCurrentPosition(fetchData);
    }

