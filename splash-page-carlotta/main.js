var UNPLASH_KEY =
  "1af89749810c0e39833aa5af842a5b75b12c2639570e45c0ce3fa9f9d22c21f9";
var UNPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNPLASH_KEY}`;

var OPEN_WEATHER_KEY = "APPID=73569faac5db27b0af875a40440fa6bf";
var WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?${OPEN_WEATHER_KEY}`;

document.addEventListener("DOMContentLoaded", function(){
    var hours = document.getElementById('js-hours');
    var mins = document.getElementById('js-minutes');
    var canvas = document.getElementById('js-canvas');
    var weatherContainer = document.getElementById('js-weather');
    var placeContainer = document.getElementById('js-place');

    function renderTime() {
        hours.innerText = new Date().getHours();
        mins.innerText = new Date().getMinutes(); 
    }

    function setTime() {
        renderTime();
        setInterval(renderTime, 1000);
    }

    async function fetchImage() {
        var unplashResponse = await fetch(UNPLASH_URL).then(function(response){
            return response.json()
        })
        
        var imageUrl = unplashResponse.urls.raw;
        renderImage(imageUrl)
    }
    
    function renderImage(imageUrl) {
        canvas.style.backgroundImage = `url(${imageUrl})`;
    }
    
    
    function getWeatherUrl(lat, lon) {
        return `${WEATHER_URL}&lat=${lat}&lon=${lon}`;
    }

    
    function renderWeather(weather, place) {
        placeContainer.innerText = place;
        weatherContainer.innerText = weather;
        weatherContainer.classList.remove('pulse');
        placeContainer.classList.remove('pulse');
    }

    async function getLocation() {
        navigator.geolocation.getCurrentPosition(async function(position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
    
          var url = getWeatherUrl(lat, lon);
    
          var weatherResponse = await fetch(url).then(function(response) {
            return response.json();
          });
    
          var weather = weatherResponse.weather[0].main;
          var place = weatherResponse.name;
    
          renderWeather(weather, place);
        });
      }

    getLocation()
    fetchImage()
    setTime()
});

