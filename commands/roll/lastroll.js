const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'lastroll',
            	group: 'roll',
            	memberName: 'lastroll',
            	description: 'check your last roll',
		examples: ['&lastroll']
        });
    }

    async run(message, input) {
		const lastroll = new Keyv(process.env.MONGODB_URI, { namespace: 'lastroll' });
	    lastroll.on('error', err => console.error('Keyv connection error:', err));
		var ulastroll = await lastroll.get(message.author.id)
		if (ulastroll == undefined) {ulastroll = []}
	    if (ulastroll == [] || ulastroll == null || ulastroll.length == 0) {
			message.reply("You have no unit left in your last roll")
		} 
		else {
			var mes = "Units from your last roll:"
			for (var i = 0; i < ulastroll.length; i++) {
				mes = mes + "\n" + (i + 1) + ". " + ulastroll[i]
			}
			const collector = new Discord.MessageCollector(message.channel, msg => msg.author.id === message.author.id, { time: 6000 });
			message.reply(mes)
		}
	}
}
module.exports = RanRoll;
