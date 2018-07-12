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
require("dotenv").config();

// *****************************************************************************
// Slack handshake
// *****************************************************************************

const controller = Botkit.slackbot({
  json_file_store: "./storage",
  interactive_replies: true,
  debug: true
}).configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
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
const trackBot = bot => {
  _bots[bot.config.token] = bot;
};

// Handle events related to the websocket connection to Slack
controller.on("rtm_open", bot => {
  console.log("** The RTM api just connected!");
});

controller.on("rtm_close", bot => {
  console.log("** The RTM api just closed");
  // you may want to attempt to re-open
});

controller.storage.teams.all((err, teams) => {
  if (err) {
    throw new Error(err);
  }

  // connect all teams with bots up to slack!
  for (const t in teams) {
    if (teams[t].bot) {
      controller.spawn(teams[t]).startRTM((err, bot) => {
        err
          ? console.log("Error connecting bot to Slack:", err)
          : trackBot(bot);
      });
    }
  }
});

module.exports = controller;

require("./scripts");
