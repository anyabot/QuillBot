const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
const aff = require("./library/aff.js").aff
const stat = require("./library/stat.js").stat

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

client.on("message", message => {
	if (message.author.bot) return;
	// This is where we'll put our code.
	if (message.content.indexOf(config.prefix) !== 0) return;
 
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if (command === "aff"){
		let name = args[0];
		if (aff[name]) {
			a1 = aff[name].aff.a1;
			a2 = aff[name].aff.a2;
			a3 = aff[name].aff.a3;
			const embed = new Discord.RichEmbed()
			.setTitle(aff[name].name)
			.setThumbnail(aff[name].icon)
			.addField("1st Affection Stat", a1, true)
			.addField("2nd Affection Stat", a2, true)
			.addField("150 Affection Stat", a3, true)
			message.channel.send({embed});
		}
		else {message.channel.send("No Data")};
	} else
	if (command === "stat") {
		let name = args[0];
		if (stat[name]) {
			const embed = new Discord.RichEmbed()
			.setTitle(stat[name].name)
			.setThumbnail(stat[name].icon)
			.addField(stat[name].stat.class1.name, "**HP: **")
			message.channel.send({embed});
		}
		else {message.channel.send("No Data")};
	};
});
 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
