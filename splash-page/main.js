const KEY = "1af89749810c0e39833aa5af842a5b75b12c2639570e45c0ce3fa9f9d22c21f9";
const SECRET_KEY =
  "0ecbbbe3748cb40d09844214953102e6636609ccc5486d0c16f6dc4b3100e6d2";

const URL = `https://api.unsplash.com/photos/random?client_id=${KEY}`;

document.addEventListener("DOMContentLoaded", function() {
  var hour = document.getElementById("js-hour");
  var minute = document.getElementById("js-minute");
  var canvas = document.getElementById("js-canvas");

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

  async function fetchWeather() {
    const coordinates = await getCoordinates();
    console.log(coordinates);
  }

  async function getCoordinates() {
    await navigator.geolocation.getCurrentPosition(
      function(position) {
        return {
          latitude: position.latitude,
          latitude: position.latitude
        };
      },
      function(error) {
        console.error(error);
        return undefined;
      }
    );
  }

  function initiate() {
    setTime();
    fetchImage();
    fetchWeather();
  }

  initiate();
});

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// function success(pos) {
//   var crd = pos.coords;

//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);
