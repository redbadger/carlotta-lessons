const controller = require("../app");

const arnieQuotes = [
  `*To crush your enemies, see them driven before you, and to hear the lamentation of their women!* – _Conan the Barbarian_\n https://www.youtube.com/watch?v=Oo9buo9Mtos`,
  `*Your clothes, give them to me, now!* – _Terminator_ \n https://www.youtube.com/watch?v=x3pu25Eroi4`,
  `*If it bleeds, we can kill it* - _Predator_ \n https://www.youtube.com/watch?v=eNr0WXQ3Ho4`,
  `*See you at the party Richter!* - _Total Recall_ \n https://www.youtube.com/watch?v=q1FS_vKJl8U`,
  `*Let off some steam, Bennett* – _Commando_ \n https://www.youtube.com/watch?v=19R2fDXCzcM`,
  `*I’ll be back* – _Terminator_ \n https://www.youtube.com/watch?v=WgPePk3kGZk`,
  `*"Get to the chopper!* - _Predator_ \n https://www.youtube.com/watch?v=-9-Te-DPbSE`,
  `*Hasta La Vista, Baby!* - _Terminator_ \n https://www.youtube.com/watch?v=Q73gUUr8Zlw`,
  `*Now this is the plan: Get your ass to Mars!* - _Total Recall_ \n https://www.youtube.com/watch?v=dAX2H0hpOc4`,
  `*"It's not a tumor!* - _Kindergarten Cop_ \n https://www.youtube.com/watch?v=6ucfgdFrlho`,
  `*I live to see you eat that contract, but I hope you leave enough room for my fist, because I'm going to ram it into your stomach and break your goddamn spine! RAAGH!* - _The Running Man_ \n https://www.youtube.com/watch?v=9nz9-NWdsis`,
  `*"Dillon, you son of a bitch!* - _Predator_ \n https://www.youtube.com/watch?v=txuWGoZF3ew`,
  `*"You hit like a vegetarian!* - _Escape Plan_ \n https://www.youtube.com/watch?v=LLaOIXXalK8`,
  `*"What the fuck did I do wrong?!* - _Total Recall_ \n https://www.youtube.com/watch?v=oGcRTJK43OM`
];

module.exports = controller.hears("arnie quote", "ambient", (bot, msg) => {
  let max = arnieQuotes.length;
  randomNumber(0, max).then(randomValue => {
    let messageString = arnieQuotes[randomValue];
    bot.reply(msg, messageString);
  });
});
