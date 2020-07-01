const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
var isNumber = new Boolean(false);

client.once('ready', () => {
  console.log('Ready');
})

client.on('message', message => {
  //console.log(message.content);
  if(message.content.startsWith(`${prefix}roll`)) {
    let member = message.member.user.username;
    let userInput = message.content.substring(6);
    let range = parseInt(userInput);

    if(!isNaN(range)) {
      let roll = Math.floor(Math.random() * Math.floor(range - 1)) + 1;
      message.channel.send(member + " rolls " + roll + " out of " + range);
      // if(roll == 1) {
      //   message.channel.send(member + " loses!");
      // }
    } else {
      message.channel.send("please enter a number");
    }
  }
})

client.login(token);