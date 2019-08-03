const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'take',
            	group: 'roll',
            	memberName: 'take',
            	description: 'take a unit from your previous roll to the barrack (max capacity 100 units)',
		examples: ['&take']
        });
    }

    async run(message, input) {
		const lastroll = new Keyv(process.env.MONGODB_URI, { namespace: 'lastroll' });
	    lastroll.on('error', err => console.error('Keyv connection error:', err));
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ulastroll = await lastroll.get(message.author.id)
		if (ulastroll == undefined) {ulastroll = []}
		var ubarrack = await barrack.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
	    if (ulastroll == [] || ulastroll == null) {
			message.reply("You have no unit to take")
		} 
		else if (ubarrack.length > 99) {message.reply("Your barrack is full")}
		else {
			var mes = "Units from your last roll:"
			for (var i = 0; i < ulastroll.length; i++) {
				mes = mes + "\n" + (i + 1) + ". " + ulastroll[i]
			}
			const collector = new Discord.MessageCollector(message.channel, msg => msg.author.id === message.author.id, { time: 6000 });
			mes = mes + "\nWhich unit do you want to take? (Input the index number to take or stop to stop)"
			message.reply(mes)
			collector.on('collect', msg => {
				const ind = msg.content
                	if (0 < ind && ind < (lastroll.length + 1) && !isNaN(ind)) {
					ind = ind - 1;
					ubarrack.push(ulastroll[ind])
					message.reply("You took " + ulastroll[ind] + " to your barrack")
					ulastroll = ulastroll.splice(ind)
					collector.stop()
				}
				else if (ind.toLowerCase() == "stop") {
					collector.stop()
				}
				else {
					message.reply("Wrong Input")
				}
            })
		}
		lastroll.set(message.author.id, ulastroll)
		barrack.set(message.author.id, ubarrack)
	}
}
module.exports = RanRoll;
