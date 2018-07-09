# Danny

Danny (for Danny DeVito :wink:) is Slack App which runs a bot

It's not a simple bot in the sense of Slack bot, is an app managing a bot using [Slack Real Time API](https://api.slack.com/rtm)

## How to install
You need to have installed Node from version *6.6.0*

To install all dependencies
`npm install --save`

### Running Danny Locally

Open a terminal tab and run `npm run tunnel`, and it will return the following

    $~ your url is: http://<random address>.localtunnel.me

In a browser tab go to the Danny app configuration page and then in [Interactive Messages](https://api.slack.com/apps/A2FT41M0C/interactive-messages)

change interactive message URL to the random address that tunnel script provide you:

    https://<random address>.localtunnel.me/slack/receive

Then in another terminal tab go to Danny directory and run `npm start`

## Arnie scripts

### Help

Returns examples of all commands

`arnold help`

### Caniuse
It returns a result from [www.caniuse.com](http://www.caniuse.com)

  `caniuse` + name of CSS property

### Weather
To know the actual weather of all the cities in the world.

`weather` + name of the city

### Tea
Returns the name of London Dev Team with a 50% of chance of Elliott to be picked it.
`who it’s making the tea`

### Yoda quotes
Bring a random Master Yoda quote

`yoda quote`

### Arnold Schwarzenegger quotes
Bring a Arnold Schwarzenegger  Yoda quote

`arnold quote`

### Governator sitecode
Returns enviroment and link of a ThirtyThree site

`sitecode` + site code from [Governator](https://governator.thirtythreebuild.co.uk/)
