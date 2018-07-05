var UNPLASH_KEY =
  "1af89749810c0e39833aa5af842a5b75b12c2639570e45c0ce3fa9f9d22c21f9";
var UNPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNPLASH_KEY}`;

document.addEventListener("DOMContentLoaded", function() {
  //Elements
  var hours = document.getElementById("js-hour");
  var minutes = document.getElementById("js-minute");
  var canvas = document.getElementById("js-canvas");

  function renderTime() {
    hours.innerText = new Date().getHours();
    minutes.innerText = new Date().getMinutes();
  }

  function setTime() {
    renderTime();
    setInterval(renderTime(), 1000);
  }

  async function fetchImage() {
    var unplashResponse = await fetch(UNPLASH_URL).then(function(response) {
      return response.json();
    });

    var imageUrl = unplashResponse.urls.raw;
    renderImage(imageUrl);
  }

  function renderImage(url) {
    canvas.style.backgroundImage = `url(${url})`;
  }

  setTime();
  fetchImage();
});
