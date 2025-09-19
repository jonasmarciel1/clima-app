
// SELEÇÃO DOS ELEMENTOS DO HTML

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherInfoDiv = document.querySelector("#weather-info");
const loadingDiv = document.querySelector("#loading");
const cityNameH2 = document.querySelector("#city-name");
const temperatureP = document.querySelector("#temperature");
const descriptionP = document.querySelector("#description");
const weatherIconImg = document.querySelector("#weather-icon");
const themeToggle = document.querySelector("#theme-toggle");
// NOVO: Seleção dos novos elementos
const countryFlagImg = document.querySelector("#country-flag");
const humidityP = document.querySelector("#humidity");
const windP = document.querySelector("#wind");



// LÓGICA DO SELETOR DE TEMA

themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
}


// FUNÇÃO PRINCIPAL DE DADOS DO CLIMA

const getWeatherData = async () => {
    const city = cityInput.value;

    if (!city) {
        alert("Por favor, digite o nome de uma cidade.");
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    loadingDiv.classList.remove("hide");
    weatherInfoDiv.classList.add("hide");

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.cod === "404") {
            alert("Cidade não encontrada.");
            loadingDiv.classList.add("hide");
            return;
        }

        // Atualiza o HTML com os dados da API
        cityNameH2.innerText = data.name;
        temperatureP.innerText = `${parseInt(data.main.temp)}°C`;
        descriptionP.innerText = data.weather[0].description;
        weatherIconImg.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        
        // NOVO: Preenche os novos campos de umidade, vento e bandeira
        countryFlagImg.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/32.png`);
        humidityP.innerText = `${data.main.humidity}%`;
        windP.innerText = `${parseInt(data.wind.speed)} km/h`;
        
        weatherInfoDiv.classList.remove("hide");
        loadingDiv.classList.add("hide");

    } catch (error) {
        alert("Ocorreu um erro ao buscar os dados do clima.");
        console.error("Erro na busca da API:", error); 
        loadingDiv.classList.add("hide");
    }
};


// EVENTOS

searchBtn.addEventListener("click", () => {
    getWeatherData();
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        getWeatherData();
    }
});
