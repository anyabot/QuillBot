const Discord = require("discord.js");
const fs = require("fs");

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
			let name = args[0];
			if (units[name]) {
				let stats = units[name].stat 
				const embed = new Discord.RichEmbed()
				.setTitle(units[name].name)
				.setThumbnail(units[name].icon)
				stats.forEach(class =>{
					.addField(stat.name, "**HP: **" + stat.hp + "\n**ATK: **"  + stat.atk + "\n**DEF: **" + stat.def + "\n**MR: **" + stat.mr + "\n**Block: **" + stat.block + "\n**Range: **" + stat.range + "\n**Range (Skill): **" + stat.rangeskill + "\n**Range (SAW): **" + stat.rangesaw + "\n**Max Cost: **" + stat.costmax + "\n**Min Cost: **"+ stat.costmin)
				});
				message.channel.send({embed});
			}
			else message.channel.send("No Data");
		};
	}
});
 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
