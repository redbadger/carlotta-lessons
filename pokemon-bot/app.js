/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack Button application that adds a bot to one or many slack teams.

# RUN THE APP:
  Create a Slack app. Make sure to configure the bot user!
    -> https://api.slack.com/applications/new
    -> Add the Redirect URI: http://localhost:3000/oauth
  Run your bot from the command line:
    clientId=<my client id> clientSecret=<my client secret> port=3000 node slackbutton_bot.js
# USE THE APP
  Add the app to your Slack by visiting the login page:
    -> http://localhost:3000/login
  After you've added the app, try talking to your bot!
# EXTEND THE APP:
  Botkit has many features for building cool and useful bots!
  Read all about it here:
    -> http://howdy.ai/botkit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// *****************************************************************************
// Dependencies
// *****************************************************************************
const Botkit = require("botkit");
const request = require("request");
const caniuse = require("caniuse-api");
const cheerio = require("cheerio");
const Store = require("jfs");
const moment = require("moment");
require("moment-precise-range-plugin");

// *****************************************************************************
// Helper methods
// *****************************************************************************
const randomNumber = require("./helpers/random-number.js");
const Caniuse = require("./helpers/caniuse.js");
const enviromentalColour = require("./helpers/enviromental-colour.js");

// *****************************************************************************
// Slack handshake
// *****************************************************************************

const controller = Botkit.slackbot({
  json_file_store: "./storage",
  interactive_replies: true,
  debug: true
}).configureSlackApp({
  clientId: "2348032665.394599352624",
  clientSecret: "53b0bbd2f54f669041f23b1f8e6909d4",
  scopes: ["bot"]
});

controller.setupWebserver(process.env.port, (err, webserver) => {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver, (err, req, res) => {
    err ? res.status(500).send("ERROR: " + err) : res.send("Success!");
  });
});

// just a simple way to make sure we don't
// connect to the RTM twice for the same team
const _bots = {};
function trackBot(bot) {
  _bots[bot.config.token] = bot;
}

// Handle events related to the websocket connection to Slack
controller.on("rtm_open", function(bot) {
  console.log("** The RTM api just connected!");
});

controller.on("rtm_close", function(bot) {
  console.log("** The RTM api just closed");
  // you may want to attempt to re-open
});

controller.storage.teams.all(function(err, teams) {
  if (err) {
    throw new Error(err);
  }

  // connect all teams with bots up to slack!
  for (const t in teams) {
    if (teams[t].bot) {
      controller.spawn(teams[t]).startRTM(function(err, bot) {
        err
          ? console.log("Error connecting bot to Slack:", err)
          : trackBot(bot);
      });
    }
  }
});

// *****************************************************************************
// Arnie quotes
// *****************************************************************************
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

controller.hears("arnie quote", "ambient", (bot, msg) => {
  let max = arnieQuotes.length;
  randomNumber(0, max).then(randomValue => {
    let messageString = arnieQuotes[randomValue];
    bot.reply(msg, messageString);
  });
});

// *****************************************************************************
// ASAP
// *****************************************************************************

let asapOnBrain = null;

controller.hears("asap", "ambient", (bot, msg) => {
  if (!asapOnBrain) {
    asapOnBrain = moment();
  }

  let lengthOfTime = moment().preciseDiff(asapOnBrain);
  let now = moment();
  let diffDays = now.diff(asapOnBrain, "days");
  let diffHours = now.diff(asapOnBrain, "hours");

  asapOnBrain = asapOnBrain = moment();
  let messageString = `It’s been ${lengthOfTime} since *ASAP* was last mentioned`;
  // bot.startPrivateConversation(msg, messageString)

  let messageUserId = msg.user;

  bot.startPrivateConversation({ user: messageUserId }, function(err, convo) {
    // controller.interactive_replies = true;
    convo.say(messageString);
    convo.ask(
      {
        attachments: [
          {
            title: "Do you want to proceed?",
            callback_id: "http://127.0.0.1:3000/slack/receive",
            attachment_type: "default",
            fallback: "Do you want to proceed?",
            actions: [
              {
                name: "yes",
                text: "yes",
                value: "yes",
                type: "button"
              },
              {
                name: "no",
                text: "no",
                value: "no",
                type: "button"
              }
            ]
          }
        ]
      },
      [
        {
          pattern: "yes",
          callback: function(reply, convo) {
            convo.say("FABULOUS!");
            convo.next();
          }
        },
        {
          pattern: "no",
          callback: function(reply, convo) {
            convo.say("Too bad");
            convo.next();
          }
        },
        {
          default: true,
          callback: function(reply, convo) {}
        }
      ]
    );
  }); //end of private conversation
});

// *****************************************************************************
// Yoda quotes
// *****************************************************************************

const yodaQuotes = [
  "Agree with you, the council does. Your apprentice, Skywalker will be.",
  "Always two there are, no more, no less: a master and an apprentice.",
  "Fear is the path to the Dark Side. Fear leads to anger, anger leads to hate; hate leads to suffering. I sense much fear in you.",
  "Qui-Gon's defiance I sense in you.",
  "Truly wonderful the mind of a child is.",
  "Around the survivors a perimeter create.",
  "Lost a planet Master Obi-Wan has. How embarrassing. how embarrassing.",
  "Victory, you say? Master Obi-Wan, not victory. The shroud of the Dark Side has fallen. Begun the Clone War has.",
  "Much to learn you still have...my old padawan... This is just the beginning!",
  "Twisted by the Dark Side young Skywalker has become.",
  "The boy you trained, gone he is, consumed by Darth Vader.",
  "The fear of loss is a path to the Dark Side.",
  "If into the security recordings you go, only pain will you find.",
  "Not if anything to say about it I have.",
  "Great warrior, hmm? Wars not make one great.",
  "Do or do not; there is no try.",
  "Size matters not. Look at me. Judge me by my size, do you?",
  "That is why you fail.",
  "No! No different. Only different in your mind. You must unlearn what you have learned.",
  "Always in motion the future is.",
  "Reckless he is. Matters are worse.",
  "When nine hundred years old you reach, look as good, you will not.",
  "No. There is... another... Sky... walker..."
];

controller.hears("yoda quote", "ambient", (bot, msg) => {
  let max = yodaQuotes.length;
  randomNumber(0, max).then(randomValue => {
    let messageString = yodaQuotes[randomValue];
    bot.reply(msg, messageString);
  });
});

// *****************************************************************************
// XKCD
// *****************************************************************************
controller.hears("xkcd", "ambient", (bot, msg) => {
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

// *****************************************************************************
// Weather
// *****************************************************************************

controller.hears("weather (.*)", "ambient", (bot, msg) => {
  let options = {
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather",
    qs: {
      q: "",
      APPID: "4fd8ab9649f81ad2e6e9a02464bc6c3f",
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

// *****************************************************************************
// Governator
// *****************************************************************************
controller.hears(
  "sitecode (.*)",
  ["ambient", "direct_message	", "direct_mention"],
  (bot, msg) => {
    let options = {
      method: "GET",
      rejectUnauthorized: false,
      url: "https://governator.thirtythreebuild.co.uk/site.php",
      qs: { sitecode: "" }
    };

    let sitecode = msg.match[1];
    options.qs.sitecode = sitecode;

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      let $ = cheerio.load(body);
      let enviroment = $("tbody")
        .children()
        .first()
        .children("[class]")
        .attr("class");
      let link = $("tbody")
        .children()
        .first()
        .children("[class]")
        .children("a")
        .attr("href");
      let color = enviromentalColour(enviroment);

      if (
        enviroment !== "vagrant" &&
        enviroment !== "build" &&
        enviroment !== "staging" &&
        enviroment !== "production"
      ) {
        let messageString = `*Wrong Sitecode* http://gph.is/1hulUUP`;
        return bot.reply(msg, messageString);
      } else {
        let messageObject = {
          text: `*${enviroment.toUpperCase()}*`,
          as_user: true,
          attachments: [
            {
              text: link,
              response_type: "ephemeral",
              color: color,
              attachment_type: "default"
            }
          ]
        };
        return bot.reply(msg, messageObject);
      }
    });
  }
);
