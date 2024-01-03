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
    });


    
    
}



function latLongApi(data) {
    console.log("Lat", data[0].lat);
    console.log("Lon", data[0].lon);

}













searchBtn.addEventListener("click", getCityApi);