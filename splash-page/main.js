const KEY = '1af89749810c0e39833aa5af842a5b75b12c2639570e45c0ce3fa9f9d22c21f9';
const SECRET_KEY =
  '0ecbbbe3748cb40d09844214953102e6636609ccc5486d0c16f6dc4b3100e6d2';
const WEATHER_KEY = `73569faac5db27b0af875a40440fa6bf`;

const URL = `https://api.unsplash.com/photos/random?client_id=${KEY}`;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_KEY}`;

document.addEventListener('DOMContentLoaded', function() {
  var hour = document.getElementById('js-hour');
  var minute = document.getElementById('js-minute');
  var canvas = document.getElementById('js-canvas');
  var weatherContainer = document.getElementById('js-weather');
  var placeContainer = document.getElementById('js-place');

  function renderTime() {
    hour.innerText = new Date().getHours();
    minute.innerText = new Date().getMinutes();
  }

  function setTime() {
    renderTime();
    setInterval(renderTime(), 1000);
  }

  async function fetchImage() {
    var unplashResponse = await fetch(URL).then(function(response) {
      return response.json();
    });

    var imageUrl = unplashResponse.urls.raw;
    return renderImage(imageUrl);
  }

  function renderImage(image) {
    return (canvas.style.backgroundImage = `url(${image})`);
  }

  function getWeatherUrl(lat, lon) {
    var query = `&lat=${lat}&lon=${lon}`;
    return `${WEATHER_URL}${query}`;
  }

  function renderCurrentWeather(weather, place) {
    weatherContainer.innerText = weather;
    placeContainer.innerText = place;
  }

  async function getCoordinates() {
    navigator.geolocation.getCurrentPosition(async function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var url = getWeatherUrl(lat, lon);
      var weatherResponse = await fetch(url).then(function(response) {
        return response.json();
      });

      var weather = weatherResponse.weather[0].main;
      var place = weatherResponse.name;

      renderCurrentWeather(weather, place);
    });
  }

  function initiate() {
    setTime();
    fetchImage();
    getCoordinates();
  }

  initiate();
});
