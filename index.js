const Discord = require('discord.js');
var GphApiClient = require('giphy-js-sdk-core');
const { prefix, token, giphyId, guildId } = require('./config.json');
const client = new Discord.Client();
let giphy = GphApiClient(giphyId);
let guild = client.guilds.cache.get("757739877398872124");
const attachment = new Discord
                      .MessageAttachment('./deathroll.png', 'deathroll.png');

client.once('ready', () => {
  console.log('Ready');
})

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#849ed6')
	.setTitle('Death Roll : How To Use')
	.setDescription('This is Death Roll, a dice rolling gambling game from WoW, that you can play using this bot !')
  .attachFiles(attachment)
	.setThumbnail('attachment://deathroll.png')
	.addFields(
    { name: '\u200B', value: '\u200B' },
		{ name: 'Commands : ', value: 'This is DeathRoll\'s list of commands : ' },
		{ name: '/help', value: "Opens this help menu you're reading now.", inline: true },
		{ name: '/roll {value}', value: 'Rolls a random number between 1 and the value specified.', inline: true },
	)
  .addFields(
    { name: '\u200B', value: '\u200B' },
		{ name: 'How To Play : ', value: "It's really easy!" },
		{ name: 'Step 1', value: 'Grab a friend and place your bets, or just roll off for fun.', inline: true },
    { name: 'Step 2', value: 'Both players type "/roll 1000". The person who rolled the highest number goes first, and the game starts.', inline: true },
		{ name: 'Step 3', value: 'The first player rolls out of 100. Then, second player rolls out of the number the first player rolled.', inline: true },
    { name: 'Step 4', value: 'Repeat until one player rolls a 1. Whoever rolls 1 loses !', inline: true },
    { name: '\u200B', value: '\u200B' },
	)
	.setFooter('Happy death rolling ! :-)', 'attachment://deathroll.png');

client.on('message', message => {

      // ----- ** HELP ** ----- //
  if(message.content.startsWith(`${prefix}help`)) {
    message.channel.send(helpEmbed);
  }

      // ----- ** ROLL ** ----- //
  if(message.content.startsWith(`${prefix}roll`)) {
    let member = message.member.user.username;
    if (guild) {
      let name = guild.member(message.author);
      member = name ? name.displayName : null;
    }
    let userInput = message.content.substring(6);
    let range = parseInt(userInput);

    if(!isNaN(range)) {
      let roll = Math.floor(Math.random() * Math.floor(range)) + 1;
      message.channel.send(member + " rolls " + roll + " out of " + range);
      if(roll == 1) {
        var random = Math.floor((Math.random() * 4) + 1);
        if(random == 1) {
          giphy.search('gifs', {"q": "loser"})
                .then((response) => {
                  var totalResponses = response.data.length;
                  var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                  var responseFinal = response.data[responseIndex];
                  message.channel.send(member + " loses !", {
                    files: [responseFinal.images.fixed_height.url]
                  })
                })
                .catch((err) => {
                  console.log("failed to post gif");
                  message.channel.send(member + " loses !");
                });
        } else if(random == 2) {
          giphy.search('gifs', {"q": "sad"})
                .then((response) => {
                  var totalResponses = response.data.length;
                  var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                  var responseFinal = response.data[responseIndex];
                  message.channel.send(member + " loses !", {
                    files: [responseFinal.images.fixed_height.url]
                  })
                })
                .catch((err) => {
                  console.log("failed to post gif");
                  message.channel.send(member + " loses !");
                });
        } else if(random == 3) {
          giphy.search('gifs', {"q": "sad"})
                .then((response) => {
                  var totalResponses = response.data.length;
                  var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                  var responseFinal = response.data[responseIndex];
                  message.channel.send(member + " loses !", {
                    files: [responseFinal.images.fixed_height.url]
                  })
                })
                .catch((err) => {
                  console.log("failed to post gif");
                  message.channel.send(member + " loses !");
                });
        } else {
          giphy.search('gifs', {"q": "betrayal"})
                .then((response) => {
                  var totalResponses = response.data.length;
                  var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                  var responseFinal = response.data[responseIndex];
                  message.channel.send(member + " loses !", {
                    files: [responseFinal.images.fixed_height.url]
                  })
                })
                .catch((err) => {
                  console.log("failed to post gif");
                  message.channel.send(member + " loses !");
                });
        }


      }
    } else {
      message.channel.send("Please enter a number.");
    }
  }

})

client.login(token);
