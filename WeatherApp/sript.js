const apikey = "dd6fbc16fbe8d86b2f47717b000d2854";
const weatherDataEl = document.getElementById("weatherdata")
const cityNameEl = document.getElementById("cityname")
const formEl = document.querySelector("form")
formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityNameEl.value;
    console.log(cityValue)
    getWeatherData(cityValue);
})


async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [`feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}`,
        `Wind speed: ${data.wind.speed}`,
    ]

    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-app">`

    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`
    
    weatherDataEl.querySelector(".description").textContent = `${description}`

    weatherDataEl.querySelector(".details").innerHTML = details.map((details)=>`<div>${details}</div>`).join("");
    } catch (error) {
        
    }
}