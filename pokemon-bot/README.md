# Ash

Ash (for Pok'emon Ash :wink:) is Slack App which runs a bot

It's not a simple bot in the sense of Slack bot, is an app managing a bot using [Slack Real Time API](https://api.slack.com/rtm)

## How to install

You need to have installed Node from version _6.6.0_

To install all dependencies
`npm install --save`

### Running Danny Locally

Open a terminal tab and run `npm run tunnel`, and it will return the following

    $~ your url is: http://<random address>.localtunnel.me

In a browser tab go to the Danny app configuration page and then in [Interactive Messages](https://api.slack.com/apps/ABLHMACJC/interactive-messages?)

change interactive message URL to the random address that tunnel script provide you:

    https://<random address>.localtunnel.me/slack/receive

Then in another terminal tab go to Danny directory and run `npm start`

## Arnie scripts

### Help

Returns examples of all commands

`arnold help`

### Weather

To know the actual weather of all the cities in the world.

`weather` + name of the city

### Yoda quotes

Bring a random Master Yoda quote

`yoda quote`

### Arnold Schwarzenegger quotes

Bring a Arnold Schwarzenegger Yoda quote

`arnold quote`

### XKCD

Bring a random XKCD cartoon

`xkcd`

### Pokemon

Return Pokemon data from [pokéapi](https://pokeapi.co/)

`pokemon` + pokemon name
