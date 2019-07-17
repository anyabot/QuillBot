const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

var units = {	
	"abel": {
		"name": "Abel",
		"gender": "Male",
		"rarity": "Gold",
		"class": "Dragon Rider",
		"aff": {
			"11": "HP+324",
			"12": "None",
			"15": "Not implemented"
			},
		"skill": {
			"normal": {
				"stages": 1,
				"name": "Heat Breath",
				"effect": "For 30 seconds, attack increases by 1.5x. Attacks become ranged (250) and ignore defense.",
				"resue": 60,
				"initial": 40
				},
			"awakened": {
				"stages": 1,
				"name": "Explode Breath",
				"effect": "Attack increases by 1.6x. Releases a defense-ignoring fireball with a massive AoE.",
				"resue": 40,
				"initial": 26.7
				},
			},
		"ability": {
			"pre-aw ability": "No Ability",
			"aw ability": "Endurance Up : HP increases by 20%."
			}
		},
	"ada": {
		"name": "Ada",
		"gender": "Female",
		"rarity": "Platinum",
		"class": "Rouge",
		"aff": {
			"11": "HP+432",
			"12": "ATK+144",
			"15": "PEV+24%"
			},
		"skill": {
			"normal": {
				"stages": 1,
				"name": "Cursed Bloodline",
				"effect": "For 30 seconds, attack, defense, and HP increase by 1.5x.",
				"resue": 60,
				"initial": 30
				},
			"awakened": {
				"stages": 1,
				"name": "Cursed Blood Awakening",
				"effect": "For 35 seconds, attack, defense, and HP increase by 1.5x + chance (10%) of causing instant death.",
				"resue": 80,
				"initial": 40
				}
			},
		"ability": {
			"pre-aw ability": "No Ability",
			"aw ability": "Endurance Up : HP increases by 20%."
			}
		},
	"adelaide": {
		"name": "Adelaide",
		"gender": "Female",
		"rarity": "Black",
		"class": "Grand Knight",
		"aff": {
			"11": "HP+900",
			"12": "ATK+90",
			"15": "DEF+90"
			},
		"skill": {
			"normal": {
				"stages": 1,
				"name": "Guard Reversal",
				"effect": "For 20 seconds, HP and defense increase by 1.8x. Allied ranged units gain 1.3x increased attack. Counterattacks block enemies for 50% of their ATK.",
				"resue": 30,
				"initial": 1
				},
			"awakened": {
				"stages": 1,
				"name": "Offense and Defense Reversal Command",
				"effect": "For 15 seconds, HP and attack increase by 1.8x. Attacks become ranged (260). Enemies within range have 90% reduced defense and MR.",
				"resue": 40,
				"initial": 5
				}
			},
		"ability": {
			"pre-aw ability": "Vanguard Firing Command I : Damage received from all enemies is reduced by 10%. While on the active team, all allied Ranged units gain Range +5.",
			"aw ability": "Vanguard Firing Command II : Damage received from all enemies is reduced by 20%. While on the active team, all allied Ranged units gain Range +10."
			}
		},
 }

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
				mes = "1st stat: " + a1 + "\n2nd stat: " + a2 + "\n150 affection stat: " +a3;
				message.channel.send(mes);
				}
			};	
		}
	}
});
 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
