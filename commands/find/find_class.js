const commando = require('discord.js-commando');
const Discord = require('discord.js');
var classname = {	
	"acolyte": {
		"base": {
			"name": "Acolyte",
			"des": "Attacks enemies within range with a defense-ignoring splash attack.\nWhen no enemies are within range, heals allies.",
			"note": "Splash radius is 133"
		},
		"aw": {
			"name": "High Acolyte",
			"des": "Attacks enemies within range with a defense-ignoring splash attack.\nWhen no enemies are within range, heals allies.",
			"note": "Splash radius is 133"
		}
	},
	"alchemist": {
		"base":{
			"name": "Alchemist",
			"des": "Physical area attack that halves the defense of enemies.",
			"note": "Defense halving lasts 2 seconds.\nThe alchemist's damage applies after the halving, so they always benefit.\nSplash radius is 80."
		},
		"cc":{
			"name": "High Alchemist",
			"des": "Physical area attack that halves the defense of enemies.",
			"note": "Defense halving lasts 2 seconds.\nThe alchemist's damage applies after the halving, so they always benefit.\nSplash radius is 80."
		},
		"aw":{
			"name": "Master Alchemist",
			"des": "Physical area attack that reduces the defense of enemies by 60%.",
			"note": "Defense halving lasts 2.33 seconds."
		},
		"aw2v1":{
			"name": "Lord of Hermes",
			"des": "Physical area attack that reduces the defense of enemies by 60%.\nSkill duration is increased by 30%.\nRange +15.",
			"note": "Large ATK increase.\nSmall HP increase."
		},
		"aw2v2":{
			"name": "Magnum Opus",
			"des": "Physical area attack that reduces the defense of enemies by 70%.\nSplash radius is increased by 1.3x.",
			"note": "Splash radius is 104.\nSmall ATK increase.\nLarge HP/DEF increase."
		}
	}
 }  

class FindClass extends commando.Command {
    	constructor(client) {
        	super(client, {
            		name: 'class',
            		group: 'find',
            		memberName: 'class',
            		description: 'find description of a class',
			args: [
				{
				key: 'class',
				prompt: 'Which class do you want to check?',
				type: 'string'
				}
			]
        	});
    	}
  
	async run(message, { class }) {
        	var name = class.toLowerCase();
		if (unitclass[name]) {
			let classname = unitclass[name];
			if (classname["base"]) {
				const embed = new Discord.RichEmbed()
				embed.setTitle(classname.base.name)
				embed.addField("Description", classname.base.des, true)
				embed.addField("Note", classname.base.note, true)
				message.channel.send({embed});
			}
		}
		else {message.channel.send("No Data")};
   	}
}

module.exports = FindClass;
