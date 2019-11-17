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
			embed.setImage('https://vignette.wikia.nocookie.net/aigis/images/d/d4/Herotower_scorechart.png/revision/latest?cb=20191031182629')
      message.channel.send(embed)
	}
}

 module.exports = FindOrb;
