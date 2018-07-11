const request = require("request");
const controller = require("../app");
const BASE_URL = "http://pokeapi.co/api/v2";
const randomNumber = require("../helpers/random-number");
const MACHINE_COUNT = 1328;

module.exports = controller.hears("machine", "ambient", async (bot, msg) => {
  const machineNumber = await randomNumber(0, MACHINE_COUNT);

  const options = {
    method: "GET",
    url: `${BASE_URL}/machine/${machineNumber}`
  };

  request(options, (error, _, body) => {
    if (!error) {
      const pokemonResponse = JSON.parse(body);

      if (pokemonResponse && !pokemonResponse.detail) {
        const { item, move, version_group } = pokemonResponse;

        const games = version_group.name.replace(/-/g, ", ");
        const moveName = move.name.replace(/-/g, " ");

        const messageString = `*Machine number:* ${item.name}\n*Move:* ${
          moveName
        }\n*Games:* ${games}`;

        return bot.reply(msg, messageString);
      }
      return bot.reply(msg, pokemonResponse.detail);
    }
    return bot.reply(msg, error);
  });
});
