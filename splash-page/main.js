document.addEventListener("DOMContentLoaded", function() {
  //Elements
  var hours = document.getElementById("js-hour");
  var minutes = document.getElementById("js-minute");

  function renderDates() {
    hours.innerText = new Date().getHours();
    minutes.innerText = new Date().getMinutes();
  }

  renderDates();
});
