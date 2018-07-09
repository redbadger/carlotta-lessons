// *****************************************************************************
// Dependencies
// *****************************************************************************
const Botkit = require('botkit');
const request = require('request');
const caniuse = require('caniuse-api');
const cheerio = require('cheerio');
const Store = require('jfs');
const moment = require('moment');
require('moment-precise-range-plugin');

// *****************************************************************************
// Helper methods
// *****************************************************************************
const randomNumber = require('./helpers/random-number.js');
const Caniuse = require('./helpers/caniuse.js');
const enviromentalColour = require('./helpers/enviromental-colour.js');

// *****************************************************************************
// Slack handshake
// *****************************************************************************
const controller = Botkit.slackbot({
  debug: false,
  json_file_store: './storage',
  interactive_replies: true
});
// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-81725368998-YFmGmso3od5cN1oX7HtTNVo6',
}).startRTM()


// asapStorage('/');
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


controller.hears('arnie quote', 'ambient', (bot, msg)=> {
    let max = arnieQuotes.length;
    randomNumber( 0, max ).then((randomValue) => {
      let messageString = arnieQuotes[randomValue];
      bot.reply(msg, messageString);
    })
});

// *****************************************************************************
// Tea makers
// *****************************************************************************

const teaMakers = [`@elliott.evans :coffee:`, `@mike: :beer:`, `@pataruco :coffee:`, `@lewis: :coffee:`, `@ian.shaw: :coffee:`];

controller.hears('tea', 'ambient', (bot, msg)=> {
    let max = teaMakers.length;
    randomNumber( 0, max ).then((randomValue) => {
      let messageString = teaMakers[randomValue];
      bot.reply(msg, messageString);
    })
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
  "Much to learn you still have...my old padawan... This is just the beginning!", "Twisted by the Dark Side young Skywalker has become.",
  "The boy you trained, gone he is, consumed by Darth Vader.",
  "The fear of loss is a path to the Dark Side.",
  "If into the security recordings you go, only pain will you find.",
  "Not if anything to say about it I have.",
  "Great warrior, hmm? Wars not make one great.",
  "Do or do not; there is no try.",
  "Size matters not. Look at me. Judge me by my size, do you?",
  "That is why you fail.", "No! No different. Only different in your mind. You must unlearn what you have learned.",
  "Always in motion the future is.",
  "Reckless he is. Matters are worse.",
  "When nine hundred years old you reach, look as good, you will not.",
  "No. There is... another... Sky... walker..."
];

controller.hears('yoda quote', 'ambient', (bot, msg)=> {
    let max = yodaQuotes.length;
    randomNumber( 0, max ).then((randomValue) => {
      let messageString = yodaQuotes[randomValue];
      bot.reply(msg, messageString);
    })
});

// *****************************************************************************
// XKCD
// *****************************************************************************
controller.hears('xkcd', 'ambient', ( bot, msg )=> {
  randomNumber( 0, 1706 ).then( ( randomValue ) => {
    let optionsXkcd = {
      method: 'GET',
      url: `http://xkcd.com/${randomValue}/info.0.json`
    }

    request(optionsXkcd, (error, response, body) => {
      if (error) throw new Error(error);
      let xkcdData = JSON.parse(body);
      let title = xkcdData.safe_title;
      let img = xkcdData.img;
      let messageString = `*${title}*\n${img}`
      bot.reply(msg, messageString);
    });
  })
});

// *****************************************************************************
// Weather
// *****************************************************************************

controller.hears('weather (.*)', 'ambient', ( bot, msg) => {
  let options = {
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    qs: { q: '',
      APPID: '4fd8ab9649f81ad2e6e9a02464bc6c3f',
      units: 'metric'
    }
  };

  let location = msg.match[1];
  options.qs.q = location;
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    let condition = JSON.parse(body);
    let messageString = `*Condition:* ${condition.weather[0].description}\n*Temperature:* ${condition.main.temp}ºC\n*Wind:* ${condition.wind.speed}Km/h`;
    bot.reply(msg, messageString);
  });
});


// *****************************************************************************
// Governator
// *****************************************************************************
controller.hears('sitecode (.*)', ['ambient', 'direct_message	', 'direct_mention'], ( bot, msg) => {
  let options = { method: 'GET',
    rejectUnauthorized: false,
    url: 'https://governator.thirtythreebuild.co.uk/site.php',
    qs: { sitecode: '' }
  };

  let sitecode = msg.match[1];
  options.qs.sitecode = sitecode;

  request(options, (error, response, body) => {

    if ( error ) throw new Error( error );
    let $ = cheerio.load(body);
    let enviroment = $('tbody').children().first().children('[class]').attr('class');
    let link = $('tbody').children().first().children('[class]').children('a').attr('href');
    let color = enviromentalColour(enviroment);

    if (enviroment !== 'vagrant' && enviroment !== 'build' &&  enviroment !== 'staging' && enviroment !== 'production') {
      let messageString = `*Wrong Sitecode* http://gph.is/1hulUUP`;
      return bot.reply( msg, messageString );
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
      }
      return bot.reply( msg, messageObject );
    }
  });
});

// *****************************************************************************
// ASAP
// *****************************************************************************

// const createAsapStorage = function() {
//   const objectsToList = function(cb) {
//     return function(err, data) {
//       if (err) {
//         cb(err, data);
//       } else {
//         cb(err, Object.keys(data).map(function(key) {
//           return data[key];
//         }));
//       }
//     };
//   };
//
//   let asap_db = new Store('./storage/asap', {saveId: 'id'});
//
//   controller.storage.asap = {
//     get: function(asap_id, cb) {
//       asap_db.get(asap_id, cb);
//     },
//     save: function(asap_data, cb) {
//       asap_db.save(asap_data.id, asap_data, cb);
//     },
//     all: function(cb) {
//       asap_db.all(objectsToList(cb));
//     }
//   }
// }

let asapOnBrain = null;

controller.hears('asap', 'ambient', ( bot, msg ) => {
  if (!asapOnBrain) {
    asapOnBrain = moment();
  }

  let lengthOfTime = moment().preciseDiff(asapOnBrain);
  let now = moment();
  let diffDays = now.diff(asapOnBrain, 'days');
  let diffHours = now.diff(asapOnBrain, 'hours');

  asapOnBrain = asapOnBrain = moment();
  let messageString =`It’s been ${lengthOfTime} since *ASAP* was last mentioned`;
  // bot.startPrivateConversation(msg, messageString)

  let messageUserId = msg.user;

  bot.startPrivateConversation({ user:messageUserId }, function(err,convo) {
    // controller.interactive_replies = true;
    convo.say(messageString);
  //   convo.ask({
  //       attachments:[
  //           {
  //               title: 'Do you want to proceed?',
  //               callback_id: '123',
  //               attachment_type: 'default',
  //               fallback: 'fallback',
  //               actions: [
  //                   {
  //                       "name":"yes",
  //                       "text": "yes",
  //                       "value": "yes",
  //                       "type": "button",
  //                   },
  //                   {
  //                       "name":"no",
  //                       "text": "no",
  //                       "value": "no",
  //                       "type": "button",
  //                   }
  //               ]
  //           }
  //       ]
  //   },[
  //       {
  //           pattern: "yes",
  //           callback: function(reply, convo) {
  //               convo.say('FABULOUS!');
  //               convo.next();
  //               // do something awesome here.
  //           }
  //       },
  //       {
  //           pattern: "no",
  //           callback: function(reply, convo) {
  //               convo.say('Too bad');
  //               convo.next();
  //           }
  //       },
  //       {
  //           default: true,
  //           callback: function(reply, convo) {
  //               // do nothing
  //           }
  //       }
  //   ]
  //
  // );

  }) //end of private conversation

  // bot.reply(msg, messageString);
});
