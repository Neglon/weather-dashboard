//Dom Variables
var searchBtn = document.getElementById('searchBtn');




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
            latLongApi(data);
            //need to make this function to append a button that can be clicked to bring back up a previous citys weather
            //historyBtn();
    });


    
    
}



function latLongApi(data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    
    console.log("Lat", data[0].lat);
    console.log("Lon", data[0].lon);

    var getWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=14e34ba9eff83ac7a4fb032306e18a09'
    console.log(getWeather);

    fetch(getWeather)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
            // function to display weather index 0 current, every 8 after is the next day 24 hours later 8,16,32,40 
            //displayWeather(data);
        })


}













searchBtn.addEventListener("click", getCityApi);