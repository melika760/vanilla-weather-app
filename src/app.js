function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours<10){
        hours =`0${hours}`
    }
    if(hours>18 && hours>00){
        let background = document.querySelector(".weather-app");
        let btnback = document.querySelector(".btn-color")
        btnback.classList.add("nightbtn")
        background.classList.add("nightbackground")
    }
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes =`0${minutes}`
    }
    let days = [ "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`

}
function formatday(timestamp){
    let date = new Date(timestamp* 1000);
    let days = [ "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thu",
    "Fri",
    "Sat",]
    return days[date.getDay()];

}
function Displayforecast(response){
    let forecast = response.data.daily;
    let forecastelement = document.querySelector("#forecast")
    let ForecastHtml = `<div class="row">`
    forecast.forEach(function(Forecastday,index){
        if(index<5){     
            ForecastHtml = ForecastHtml +
            `  <div class="col-2 item">
            <div class="day">${formatday(Forecastday.dt)}</div>
            <img
            src="http://openweathermap.org/img/wn/${
                Forecastday.weather[0].icon
              }@2x.png"
            alt=""
            width="45"
          />
          <div class="forecast-temp">
            <span class="max-temp">${Math.round(Forecastday.temp.max)}°</span> 
            <span class="min-temp">${Math.round(Forecastday.temp.min)}°</span>
          </div>
          </div>`}
   })
ForecastHtml = ForecastHtml+`</div>`

      forecastelement.innerHTML=ForecastHtml


}
function getForecast(coordinates){
    let Apikey ="1e9fb88fe728a434cb6268bdccba077b"
    let ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${Apikey}`
    console.log(ApiUrl)
    axios.get(ApiUrl).then(Displayforecast)
}

function showtemp(response){
let temp = response.data.main.temp;
celiustemp =response.data.main.temp;
let temperature = Math.round(temp);
let currentDegree = document.querySelector("#current-degree")
let description = document.querySelector("#description")
let humadity = document.querySelector("#humadity")
let wind = document.querySelector("#wind")
let dateElement = document.querySelector("#date")
let iconelement = document.querySelector("#icon")
currentDegree.innerHTML = temperature +"°";
description.innerHTML = response.data.weather[0].description;
humadity.innerHTML = response.data.main.humidity;
wind.innerHTML = response.data.wind.speed
dateElement.innerHTML = formatDate(response.data.dt * 1000)
iconelement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
iconelement.setAttribute("alt", response.data.weather[0].description);
getForecast(response.data.coord)
}
function search(city){
    let Apikey = "1e9fb88fe728a434cb6268bdccba077b";
    let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Apikey}`;
    axios.get(ApiUrl).then(showtemp);  
}


function submit(event){
    event.preventDefault();
    let Cityinput = document.querySelector("#city-input");
    let CityName = document.querySelector("#cityname")
    CityName.innerHTML = Cityinput.value;
    search(Cityinput.value)
}
function displaytemp(event){
    event.preventDefault();
    let currentDegree = document.querySelector("#current-degree");
    let Farenheitelement = (celiustemp*9)/5+32;
    celceliustempeture.classList.remove("active");
    frenheittemp.classList.add("active")
    currentDegree.innerHTML=Math.round(Farenheitelement)
}
function showtempeture(event){
    event.preventDefault();
    let currentDegree = document.querySelector("#current-degree");
    celceliustempeture.classList.add("active");
    frenheittemp.classList.remove("active")
    currentDegree.innerHTML=Math.round(celiustemp)
}

 let form = document.querySelector("#form")
 form.addEventListener("submit",submit)
 search("london")
let celiustemp = null
 let frenheittemp = document.querySelector("#Farenheit-link")
 frenheittemp.addEventListener("click",displaytemp);
 let celceliustempeture = document.querySelector("#celisus-link")
 celceliustempeture.addEventListener("click",showtempeture)