const request = require("request");
const controller = require("../app");

module.exports = controller.hears("weather (.*)", "ambient", (bot, msg) => {
  let options = {
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather",
    qs: {
      q: "",
      APPID: "73569faac5db27b0af875a40440fa6bf",
      units: "metric"
    }
  };

  let location = msg.match[1];
  options.qs.q = location;
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    let condition = JSON.parse(body);
    let messageString = `*Condition:* ${
      condition.weather[0].description
    }\n*Temperature:* ${condition.main.temp}ºC\n*Wind:* ${
      condition.wind.speed
    }Km/h`;
    bot.reply(msg, messageString);
  });
});
