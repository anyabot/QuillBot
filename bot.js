const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
var stat = require("./library/stat.js").stat;



// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

client.on("message", message => {
	if (message.author.bot) return;
	// This is where we'll put our code.
	if (message.content.indexOf(config.prefix) !== 0) return;
 
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	

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
