const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

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
		case "info" :{
			let name = args[0]
			fs.readdir("./units/", (err, units) => {
				if (err) return console.error(err);
				var found = false
				units.forEach(unit => {
					unit.substring(0, unit.length - 1);
					if (!unit = args[0]) return;
					else {
						found = true
						const unit2 = require('./units/name);
						let uname = unit2.name;
						message.channel.send(uname);
						break;
					}
				});
				message.channel.send('Unit not found.');
				break;
			});	
		}
	}
});
 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
