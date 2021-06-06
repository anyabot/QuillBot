const commando = require('discord.js-commando');
const Discord = require('discord.js');
var moment = require('moment');
var printf = require('printf');
var name = require('../../library/orb.js').name;

class FindOrb extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'orb',
			group: 'util2',
			memberName: 'orb',
			description: 'find orb farm day',
			examples: ['&prince'],
			args: [{
				key: 'text',
				prompt: 'What orb/day do you want to know about?',
				type: 'string',
				default: "all"
			}]
		});
	}
	async run(message, { text }) {
		var orb = text.toLowerCase()
		if (name[orb]) orb = name[orb];
		if (orb == "all") {
			var now = new Date()
			var m = moment(now).add(9, 'hours')
			var mm = m.format('ddd MMM DD YYYY HH mm ss')
			var words = mm.split(' ')
			var date = words[0]
			var tday;
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			if (date == "Mon") { tday = "(Today)" }
			else { tday = " " }
			embed.addField("Monday " + tday, "Sniper, Dark Knight, Priest, Rearguard Strategist, Heavy Gunner")
			if (date == "Tue") { tday = "(Today)" }
			else { tday = " " }
			embed.addField("Tuesday " + tday, "Unicorn Knight, Pegasus Knight, Master Monk, Berserker, Feng Shui Master")
			if (date == "Wed") { tday = "(Today)" }
			else { tday = " " }
			embed.addField("Wednesday " + tday, "Soldier Chief, Assassin, Captain, High Shaman, High Bishop")
			if (date == "Thu") { tday = "(Today)" }
			else { tday = " " }
			embed.addField("Thursday " + tday, "Battle Master, Samurai Master, Rune Fencer, Vampire Killer, Sailor Chief")
			if (date == "Fri") { tday = "(Today)" }
			else { tday = " " }
			embed.addField("Friday " + tday, "Lord Witch, Warlock, Vanguard Strategist, Ninja Master, Arch Angel")
			if (date == "Sat") { tday = "(Today)" }
			else { tday = " " }
			embed.addField("Saturday " + tday, "Battle Mage, High Ranger, Top Dancer, Dragon Knight, Priest Warrior Leader")
			if (date == "Sun") { tday = "(Today)" }
			else { tday = " " }
			embed.addField("Sunday " + tday, "High Alchemist, Witch Doctor, Machinist, Master Thief, Bowrider Chief")
			message.channel.send(embed)
		}
		else if (orb == "mon") {
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			embed.addField("Monday ", "Sniper, Dark Knight, Priest, Rearguard Strategist, Heavy Gunner")
			message.channel.send(embed)
		}
		else if (orb == "tue") {
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			embed.addField("Tuesday ", "Unicorn Knight, Pegasus Knight, Master Monk, Berserker, Feng Shui Master")
			message.channel.send(embed)
		}
		else if (orb == "wed") {
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			embed.addField("Wednesday ", "Soldier Chief, Assassin, Captain, High Shaman, High Bishop")
			message.channel.send(embed)
		}
		else if (orb == "thu") {
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			embed.addField("Thursday", "Battle Master, Samurai Master, Rune Fencer, Vampire Killer, Sailor Chief")
			message.channel.send(embed)
		}
		else if (orb == "fri") {
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			embed.addField("Friday ", "Lord Witch, Warlock, Vanguard Strategist, Ninja Master, Arch Angel")
			message.channel.send(embed)
		}
		else if (orb == "sat") {
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			embed.addField("Saturday ", "Battle Mage, High Ranger, Top Dancer, Dragon Knight, Priest Warrior Leader")
			message.channel.send(embed)
		}
		else if (orb == "sun") {
			var embed = new Discord.RichEmbed()
			embed.setColor('RANDOM')
			embed.addField("Sunday ", "High Alchemist, Witch Doctor, Machinist, Master Thief, Bowrider Chief")
			message.channel.send(embed)
		}
		else { message.channel.send("No Data") }
	}
}

module.exports = FindOrb;
