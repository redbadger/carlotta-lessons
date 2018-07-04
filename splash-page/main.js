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

    var imageUrl = unplashResponse.urls.regular;
    return renderImage(imageUrl);
  }

  function renderImage(image) {
    return (canvas.style.backgroundImage = `url(${image})`);
  }

  function initiate() {
    setTime();
    fetchImage();
  }

  initiate();
});
