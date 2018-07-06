var UNPLASH_KEY =
  "1af89749810c0e39833aa5af842a5b75b12c2639570e45c0ce3fa9f9d22c21f9";
var UNPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNPLASH_KEY}`;

var OPEN_WEATHER_KEY = "APPID=73569faac5db27b0af875a40440fa6bf";
var WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?${OPEN_WEATHER_KEY}`;

document.addEventListener("DOMContentLoaded", function(){
    var hours = document.getElementById('js-hours');
    var mins = document.getElementById('js-minutes');

    function renderTime() {
        hours.innerText = new Date().getHours();
        mins.innerText = new Date().getMinutes(); 
    }

    function setTime() {
        renderTime();
        setInterval(renderTime(), 1000);
    }

   
    setTime()
});

