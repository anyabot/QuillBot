const commando = require('discord.js-commando');
const Discord = require('discord.js');
var moment = require('moment');
var printf = require('printf');
var name = require('../../library/orb.js').name;

class FindOrb extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'scoring',
			group: 'util2',
			memberName: 'scoring',
			aliases: ['uplimit', 'tohscoring', 'tohuplimit', 'scoringtable', 'scoringchart'],
			description: 'show toh scoring table',
			examples: ['&uplimit'],
		});
	}
	async run(message, input) {
		var embed = new Discord.RichEmbed()
		embed.setTitle('Tower of Heroes Up Scoring')
		embed.setURL('https://aigis.fandom.com/wiki/The_Tower_of_Heroes')
		embed.setDescription("Base Amount x Unit Count Modifier x Cost Modifier = Score")
		embed.addField('Base Amount', '★ : 2500\n★★ : 5000\n★★★ : 10000')
		embed.addField('Unit Count Modifier', 'If 0 units are present in Team (Prince Only), base multiplier has a value of x2.5\nFor every unit added, -0.1 to base multiplier')
		embed.addField('Cost Modifier', 'If no Unit Points are expended, base multiplier has a value of x7.5\nFor every 1 UP expended, -0.02 to base multiplier')
		embed.setImage('https://vignette.wikia.nocookie.net/aigis/images/d/d4/Herotower_scorechart.png/revision/latest?cb=20191031182629')
		message.channel.send(embed)
	}
}

module.exports = FindOrb;
