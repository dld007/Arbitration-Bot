//Get axios libary for http requests
const axios = require('axios').default;

//Get dotenv library, which converts .env to process.env
require("dotenv").config()

//Get discord library to access discord api
const Discord = require("discord.js")

//Get warframe worldstatedata library to access api
const worldstateData = require('warframe-worldstate-data');
const WARFRAME_API_URL = 'https://api.warframestat.us';
const platform = 'pc';
const arbit = "arbitration"

const WARFRAME_API_REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  'User-Agent': 'axios/0.19.2'
};

//Set up arbitration variable
var Arbit = {
  "activation": "2020-06-11T23:54:05Z",
  "expiry": "2020-06-11T23:54:05Z",
  "node": "string",
  "enemy": "Orokin",
  "type": "string",
  "archwing": true,
  "sharkwing": true
};

//Function to retrieve arbitration data from server
//Returns a string with data description
function getWarframeData() {
  axios.get(`${WARFRAME_API_URL}/${platform}/arbitration`, { headers:
  WARFRAME_API_REQUEST_HEADERS })
    .then(response => {
    Arbit = response.data;
    console.log(response.data);
  })
  .catch(error => console.error('On get error',error))
  now = new Date();

  var oString = "The current arbitration is a " + Arbit.type + " mission in " +
    Arbit.node + " with enemy " + Arbit.enemy + " and expires at " + (now.getUTCHours()-3) + ":00 EST";

  return oString;
}

//Log in
const client = new Discord.Client()
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//If a user sends "$arbitration" into a channel, it returns the arbitration data and then every
//hour afterwards, the bot sends the new arbitration data
client.on('message', function(message) {
    // Now, you can use the message variable inside
    if (message.content === "$arbitration") {
        outputString = getWarframeData();
        message.channel.send(outputString)
        .catch(error => console.error('On get error',error));

        var interval = setInterval (function () {
            outputString = getWarframeData();
            // use the message's channel (TextChannel) to send a new message
            message.channel.send(outputString)
            .catch(error => console.error('On get error',error));
        }, 3600000);
    }
});

client.login(process.env.BOT_TOKEN)
