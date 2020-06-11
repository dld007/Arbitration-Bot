//Get axios libary for http requests
const axios = require('axios').default;

//Get dotenv library, which converts .env to process.env
require("dotenv").config()

//Get discord library to access discord api
const Discord = require("discord.js")

/*
//Get warframe worldstatedata library to access api
const worldstateData = require('warframe-worldstate-data');
const WARFRAME_API_URL = 'git://github.com/wfcd/warframe-worldstate-data.git'
const WARFRAME_API_REQUEST_HEADERS = {
  'Content-Type': 'application/json'
};

const Arbit = {
  "activation" = "",
  'expiry' = "",
  'node' = "",
  "enemy" = "",
  "type": "",
  "archwing": true,
  "sharkwing": true
};
*/

const client = new Discord.Client()
//log in
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong")
  }
})

client.login(process.env.BOT_TOKEN)
