const request = require("request");
const randomNumber = require("../helpers/random-number");
const controller = require("../app");

module.exports = controller.hears("xkcd", "ambient", (bot, msg) => {
  randomNumber(0, 1706).then(randomValue => {
    let optionsXkcd = {
      method: "GET",
      url: `http://xkcd.com/${randomValue}/info.0.json`
    };

    request(optionsXkcd, (error, response, body) => {
      if (error) throw new Error(error);
      let xkcdData = JSON.parse(body);
      let title = xkcdData.safe_title;
      let img = xkcdData.img;
      let messageString = `*${title}*\n${img}`;
      bot.reply(msg, messageString);
    });
  });
});
