const commando = require('discord.js-commando');
const Discord = require('discord.js');
var moment = require('moment');
var printf = require('printf');

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
			prompt: 'What AW Prince do you want to know about?',
		    type: 'string',
		default: "all"
		}]
        });
    }
	async run(message, { text }) {
		var orb = text.toLowerCase()
		if (orb == "all"){
			var now = new Date()
			var m = moment(now).add(9, 'hours')
			var mm = m.format('ddd MMM DD YYYY HH mm ss')
			var words = mm.split(' ')
			var date = words[0]
			var ms = "```|--------------------------------------------------------------------------------|"
			let line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           ---------------------------------------------------------------------|\n|%-10s | %-20s | %-20s | %-20s |","Monday", "Sniper", "Dark Knight", "Priest", "(Today)", "Rearguard Strategist", "Heavy Gunner", " ")
			ms = ms + line + "|--------------------------------------------------------------------------------|"
			ms = ms + "```"
			message.channel.send(ms)
		}
	}
}

 module.exports = FindOrb;
