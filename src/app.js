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
function forecast(){
    let forecastelement = document.querySelector("#forecast")
    let days = ["Thu","Fri","Sat","Sun","Mon"]
    let ForecastHtml = `<div class="row">`
    days.forEach(function(days){ForecastHtml = ForecastHtml +
        `  <div class="col-2">
        <div class="day">${days}</div>
        <img
        src="http://openweathermap.org/img/wn/50d@2x.png"
        alt=""
        width="70"
      />
      <div class="forecast-temp">
        <span class="max-temp">19°</span> 
        <span class="min-temp">10°</span>
      </div>
      </div>`})
ForecastHtml = ForecastHtml+`</div>`

      forecastelement.innerHTML=ForecastHtml


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
 forecast()
let celiustemp = null
 let frenheittemp = document.querySelector("#Farenheit-link")
 frenheittemp.addEventListener("click",displaytemp);
 let celceliustempeture = document.querySelector("#celisus-link")
 celceliustempeture.addEventListener("click",showtempeture)