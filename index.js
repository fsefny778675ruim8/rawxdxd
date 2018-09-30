//tips
//'\n' = new line
//Required
const Discord = require("discord.js"); 
const { Client, Util } = require('discord.js');
const ms = require("ms");
const fs = require("fs");
const moment = require('moment');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const opus = require('opusscript');
const config = require("./config.json");
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const bot = new Discord.Client();
const client = new Discord.Client();
const newUsers = [];
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();



bot.on("ready", async () => {
  console.log(`Currently running on ${bot.guilds.size} server(s)!\n\n\n\n\n\n\n\n\n\n`);
  bot.user.setActivity(".help", {type: "WATCHING"});
});
bot.on("message", function(message) {
    console.log(message.content);
});

bot.on("message", function(message) {
    if(message.author.equals(bot.user))  return;
    const args = message.content.split(" ");

	switch (args[0].toLowerCase()) {
		case "<@207926671381102593>":
			message.channel.send(message.author.toString() + " Ayo buddy! Sorry but <@207926671381102593> is currenntly on a break from the internet when I get any infomation on him I'll report it right <#475215359331270656> with a nice be @ everyone\n\n*(This means he won't be responding for a while :two_hearts:)*");
			break;
		case "<@478162117573214211>":
			message.channel.send(message.author.toString() + " Please don't @ me again it's very annoying I was in the middle of a good old :eggplant: :fist:");
			break;
	}
})

bot.on("message", function(message) {
    if(message.author.equals(bot.user))  return;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.substring(config.prefix.length).split(" ");

	switch (args[0].toLowerCase()) {
		case "help":
			const embed = new Discord.RichEmbed()
				.addField("Help System", "All of our major commands", false)
				.addField(".music", "This command is working but still very bugy", false)
				.addField(".report", "This command is if you believe someone has broken a rule you may report it to staff.", false)
				.setColor(0x9900FF)
				.setFooter("This Bot is receiving constant updates!")
				.setThumbnail(message.author.avatarURL)
			message.channel.sendEmbed(embed);
			break;
	}
});
bot.on("message", function(message) {
    if(message.author.equals(bot.user))  return;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.substring(config.prefix.length).split(" ");

	switch (args[0].toLowerCase()) {
		case "music":
			const embed = new Discord.RichEmbed()
				.addField("Music System", "commands under our music side", false)
				.addField(".play <name/url>", "This'll allow you to either find a song related to the title you gave or play the song you gave.", false)
				.addField(".skip", "This'll skip the current song that's playing.", false)
				.addField(".stop", "This'll stop the bot from playing any music.", false)
				.addField(".volume <1-10>", "This'll change the volume of the bot *(for everyone)*.", false)
				.addField(".np/queue", "This'll show the list of songs queued in the bot.", false)
				.addField(".pause", "This'll pause the song/playlist.", false)
				.addField(".resume", "This'll unpause the song/playlist.", false)
				.setColor(0x9900FF)
				.setFooter("*(This section of the bot isn't always up as we're looking for a reliable host)*")
				.setThumbnail(message.author.avatarURL)
			message.channel.sendEmbed(embed);
			break;
	}
});

bot.on("message", async message => {
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  
  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(command === "clear") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(cmd === `${config.prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Example report: *.report <@478162117573214211> <reason>*");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("**__Reports__**")
    .setColor("#9900FF")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason)
    .setThumbnail(message.author.avatarURL);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
  if(cmd === `${config.prefix}reports`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Example report: *.report <@478162117573214211> <reason>*");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("**__Reports__**")
    .setColor("#9900FF")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason)
    .setThumbnail(message.author.avatarURL);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
});

bot.login(process.env.token)
