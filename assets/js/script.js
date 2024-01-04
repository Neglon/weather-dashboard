//Dom Variables
var searchBtn = document.getElementById('searchBtn');
var btnHistoryEl = document.getElementById('searchHistoryBtn');
var btnHistory = document.getElementById('historyBtnClick');

//current weather dom id variables
var cCity = document.getElementById('cCity');
var cDate = document.getElementById('cDate');
var cSymbol = document.getElementById('cSymbol');
var cTemp = document.getElementById('cTemp');
var cWind = document.getElementById('cWind');
var cHumidity = document.getElementById('cHumidity');

//5 day weather dom id variables to come
var fiveDay = document.getElementById('forecast');




function getCityApi() {
    var cityInput = document.getElementById('cityInput').value.trim();
    var cityApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=5&appid=14e34ba9eff83ac7a4fb032306e18a09';
    //console.log(cityApi);
    

    
    fetch(cityApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data)
            //console.log(data[0].lat);
            //console.log(data[0].lon);
            //console.log("is this passing the user input ", cityInput);
            latLongApi(data, cityInput);
            
    });


    
    
}



function latLongApi(data, cityInput) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    
    //console.log("Lat", data[0].lat);
    //console.log("Lon", data[0].lon);

    var getWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&cnt=48&appid=14e34ba9eff83ac7a4fb032306e18a09'
    //console.log(getWeather);
    makeBtn(getWeather, cityInput);

    fetch(getWeather)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            //console.log(data);
        
            // function to display weather index 0 current, every 8 after is the next day 24 hours later 8,16,32,40 
            displayWeather(data);
            displayFiveDay(data);
        })


}
//function to create buttons with the recently searched cities, and apply the url as data
function makeBtn(data, cityInput) {
    var button = document.createElement('button');

    button.setAttribute('class', 'historyBtn');

    button.setAttribute('id', 'historyBtnClick');

    button.setAttribute('value', data);

    btnHistoryEl.appendChild(button);

    button.textContent = cityInput;

}

//function to display the current weather in searched city
function displayWeather(data) {
    cCity.textContent = data.city.name;
    
    var date =  dayjs.unix(data.list[0].dt).format('MMM, D, YYYY');

    cDate.textContent = date;
    cSymbol.removeAttribute('class');
    cSymbol.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png');
    
    //console.log(cSymbol);
    //console.log(data.list[0].weather[0].icon);
    //console.log('https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png')
    cTemp.textContent = data.list[0].main.temp;
    cWind.textContent = data.list[0].wind.speed;
    cHumidity.textContent = data.list[0].main.humidity
}


function displayFiveDay(data) {
    //clears out any old 5 day forcast html
    fiveDay.innerHTML = '';

    //loop to iterate through 5 future days, and create all relative elements for each day
    for (var i = 7; i < 41; i += 8) {
        
        //console.log(i);
        var newDivEl = document.createElement('div');
        newDivEl.setAttribute('id', 'dayCard');

        var fDate =  dayjs.unix(data.list[i].dt).format('MMM, D, YYYY');
        var newH = document.createElement('h3');
        newH.textContent = fDate;
        newDivEl.appendChild(newH);

        var fImg = document.createElement('img');
        fImg.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png');
        newDivEl.appendChild(fImg);

        var fTemp = document.createElement('p');
        fTemp.textContent = "Temp: " + data.list[i].main.temp + "°F";
        newDivEl.appendChild(fTemp);

        var fWind = document.createElement('p');
        fWind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";
        newDivEl.appendChild(fWind);

        var fHumid = document.createElement('p');
        fHumid.textContent = "Humidity: " + data.list[i].main.humidity;
        newDivEl.appendChild(fHumid);

        fiveDay.appendChild(newDivEl);




    }   
}

function buttonGetApi(event) {
    var btnClick = event.target;

    //console.log(btnClick.value);

    fetch(btnClick.value)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {  
            displayWeather(data);
            displayFiveDay(data);
        })

}







 
searchBtn.addEventListener("click", getCityApi);
btnHistoryEl.addEventListener("click", buttonGetApi);