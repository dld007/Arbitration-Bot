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

//Log in
const client = new Discord.Client()
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//Set variables
var now = new Date();
var outputString = "";

setInterval(function() {
  //Request arbitration data
  axios.get(`${WARFRAME_API_URL}/${platform}/arbitration`, { headers:
  WARFRAME_API_REQUEST_HEADERS })
    .then(response => {
    Arbit = response.data;
    console.log(response.data);
  })
  .catch(error => console.error('On get error',error))
  now = new Date();
}, 3500000); //Repeats every 3,500,000 ms

client.on('message', function(message) {
    outputString = "The current arbitration is a " + Arbit.type + " mission in " +
      Arbit.node + " with enemy " + Arbit.enemy + " and expires at " + (now.getUTCHours()-3) + ":00 EST";
  
    //Initialization message - the arbitration message gets sent in the channel this init. message gets sent
    if (message.content === "$arbitration") {
        var interval = setInterval (function () {
            // use the message's channel (TextChannel) to send a new message
            message.channel.send(outputString)
            .catch(error => console.error('On get error',error));
        }, 3600000); //Repeats every hour
    }
});

client.login(process.env.BOT_TOKEN)
