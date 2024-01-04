//Dom Variables
var searchBtn = document.getElementById('searchBtn');
var btnHistoryEl = document.getElementById('searchHistoryBtn');

//current weather dom id variables
var cCity = document.getElementById('cCity');
var cDate = document.getElementById('cDate');
var cSymbol = document.getElementById('cSymbol');
var cTemp = document.getElementById('cTemp');
var cWind = document.getElementById('cWind');
var cHumidity = document.getElementById('cHumidity');

//5 day weather dom id variables to come





function getCityApi() {
    var cityInput = document.getElementById('cityInput').value.trim();
    var cityApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=5&appid=14e34ba9eff83ac7a4fb032306e18a09';
    console.log(cityApi);
    

    
    fetch(cityApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].lat);
            console.log(data[0].lon);
            console.log("is this passing the user input ", cityInput);
            latLongApi(data, cityInput);
            
    });


    
    
}



function latLongApi(data, cityInput) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    
    console.log("Lat", data[0].lat);
    console.log("Lon", data[0].lon);

    var getWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=14e34ba9eff83ac7a4fb032306e18a09'
    console.log(getWeather);
    makeBtn(getWeather, cityInput);

    fetch(getWeather)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
        
            // function to display weather index 0 current, every 8 after is the next day 24 hours later 8,16,32,40 
            displayWeather(data);
        })


}

function makeBtn(data, cityInput) {
    var button = document.createElement('button');

    button.setAttribute('class', 'historyBtn');

    button.setAttribute('value', data);

    btnHistoryEl.appendChild(button);

    button.textContent = cityInput;

}


function displayWeather(data) {
    cCity.textContent = data.city.name; 
    //cDate
    //console.log("DATE---", data.list[0].dt_text);
    cSymbol.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png');
    console.log(cSymbol);
    console.log(data.list[0].weather[0].icon);
    console.log('https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png')
    cTemp.textContent = data.list[0].main.temp;
    cWind.textContent = data.list[0].wind.speed;
    cHumidity.textContent = data.list[0].main.humidity
}













searchBtn.addEventListener("click", getCityApi);