//Get axios libary for http requests
const axios = require('axios').default;

//Get dotenv library, which converts .env to process.env
require("dotenv").config()

//Get discord library to access discord api
const Discord = require("discord.js")

//Get warframe worldstatedata library to access api
const worldstateData = require('warframe-worldstate-data');
const WARFRAME_API_URL = 'https://api.warframestat.us';
const platform = 'PC';
const arbit = "arbitration"

const WARFRAME_API_REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  'User-Agent': 'axios/0.19.2'
};

//Set up arbitration variable
var Arbit = {
  activation:'',
  expiry: '',
  node: '',
  enemy: '',
  type: '',
  archwing: true,
  sharkwing: true
};

//Request arbitration data
axios.get(`${WARFRAME_API_URL}/${platform}/arbitration`, { headers:
WARFRAME_API_REQUEST_HEADERS })
  .then(response => {
  Arbit = response.data;
})
.catch(error => console.error('On get error',error))

var now = new Date();
console.log(now.getUTCMinutes());
console.log(now.getUTCHours());

//Log in
const client = new Discord.Client()
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//If user sends !Arbit, send arbitration data
client.on("message", msg => {
  if (msg.content === "!Arbitration") {
    msg.reply("The current arbitration is in " + Arbit.node + " with enemy "
      + Arbit.enemy + " and expires at " + (now.getUTCHours()-3) + ":00 EST");
  }
})

client.login(process.env.BOT_TOKEN)

