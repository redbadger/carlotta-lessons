const request = require("request");
const controller = require("../app");
const BASE_URL = "http://pokeapi.co/api/v2";

module.exports = controller.hears("pokemon (.*)", "ambient", (bot, msg) => {
  const pokemon = msg.match[1].toLowerCase();
  const options = {
    method: "GET",
    url: `${BASE_URL}/pokemon/${pokemon}`
  };

  request(options, (error, _, body) => {
    if (!error) {
      const pokemonResponse = JSON.parse(body);

      if (pokemonResponse && !pokemonResponse.detail) {
        const {
          name,
          abilities,
          species,
          types,
          height,
          weight,
          held_items,
          sprites
        } = pokemonResponse;

        const abilitiesName = abilities
          ? abilities
              .map(ability => ability.ability.name)
              .toString()
              .replace(/,/g, ", ")
          : "no abilities";

        const typesName = types
          ? types
              .map(type => type.type.name)
              .toString()
              .replace(/,/g, ", ")
          : "no types";

        const heldItemsName = held_items
          ? held_items
              .map(item => item.item.name)
              .toString()
              .replace(/,/g, ", ")
          : "no held items";

        const image =
          sprites && sprites.front_default ? sprites.front_default : "no image";

        const messageString = `*Name:* ${name}\n*Abilities:* ${abilitiesName}\n*Species:* ${
          species.name
        }\n*Types*: ${typesName}\n*Height:* ${height}\n*Weight:* ${weight}\n*Held Items:* ${heldItemsName}\n*Image:* ${image}`;

        return bot.reply(msg, messageString);
      }
      return bot.reply(msg, pokemonResponse.detail);
    }
    return bot.reply(msg, error);
  });
});
