const Discord = require("discord.js");
const fs = require("fs");
var forEach = require('async-foreach').forEach;

const client = new Discord.Client();
const config = require("./config.json");
const units = require("./library/units.js").units

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

client.on("message", message => {
	if (message.author.bot) return;
	// This is where we'll put our code.
	if (message.content.indexOf(config.prefix) !== 0) return;
 
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	switch (command) {
		case "ping" :
			message.channel.send('Pong!');
			break;
		case "blah" :
			message.channel.send('Meh.');
			break;
		case "aff" :{
			let name = args[0];
			if (units[name]) {
				a1 = units[name].aff.a1;
				a2 = units[name].aff.a2;
				a3 = units[name].aff.a3;
				const embed = new Discord.RichEmbed()
				.setTitle(units[name].name)
				.setThumbnail(units[name].icon)
				.addField("1st Affection Stat", a1, true)
				.addField("2nd Affection Stat", a2, true)
				.addField("150 Affection Stat", a3, true)
				message.channel.send({embed});
			}
			else message.channel.send("No Data");
		};
		case "stat" :{
			let name = args.join("");
			if (units[name]) {
				let stats = units[name].stat 
				const embed = new Discord.RichEmbed()
				.setTitle(units[name].name)
				.setThumbnail(units[name].icon)
				forEach(stats, function(item) {
					.addField(item.name, "**HP: **" + item.hp + "\n**ATK: **"  + item.atk + "\n**DEF: **" + item.def + "\n**MR: **" + item.mr + "\n**Block: **" + item.block + "\n**Range: **" + item.range + "\n**Range (Skill): **" + item.rangeskill + "\n**Range (SAW): **" + item.rangesaw + "\n**Max Cost: **" + item.costmax + "\n**Min Cost: **"+ item.costmin)
				});
				message.channel.send({embed});
			}
			else message.channel.send("No Data");
	}
});
 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
