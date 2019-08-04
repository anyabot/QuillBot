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
              args: [{
		    key: 'ind',
			prompt: 'Which unit do you want to take? (Input the index number from &lastroll)',
		    type: 'integer'
		}],
		examples: ['&take 1']
        });
    }

    async run(message, { ind }) {
		const lastroll = new Keyv(process.env.MONGODB_URI, { namespace: 'lastroll' });
	    lastroll.on('error', err => console.error('Keyv connection error:', err));
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ulastroll = await lastroll.get(message.author.id)
		if (ulastroll == undefined) {ulastroll = []}
		var ubarrack = await barrack.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
	    if (ulastroll == [] || ulastroll == null || ulastroll.length == 0) {
			message.reply("You have no unit to take")
		} 
	    else if (ind < 1 || ind > ulastroll.length) {message.reply("Wrong Index")}
		else if (ubarrack.length > 99) {message.reply("Your barrack is full")}
		else {
			var unit = ulastroll[ind-1]
			var mes = "Do you want to take " + unit + " to your barrack? (y/n)"
			message.channel.send(mes).then(msg => {

				msg.react('🇾').then( r => {
					msg.react('🇳')

					// Filters
					const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' || reaction.emoji.name === '🇳') && user.id === message.author.id;

					const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});

					backwards.on('collect', r => {
						r.remove(r.users.filter(u => !u.bot).first());
							if (r.emoji.name === "🇳") {
							msg.edit("Cancelled")
						}
						else if (r.emoji.name === "🇾") {
							ubarrack.push(unit)
							message.reply("You took " + unit + " to your barrack")
							for (var i = ind - 1; i < ulastroll.length - 1; i++) {
								ulastroll[i] = ulastroll[i+1]
							}
							ulastroll.pop()
							lastroll.set(message.author.id, ulastroll)
							barrack.set(message.author.id, ubarrack)
						}
					})
				})
			})
		}
	}
}
module.exports = RanRoll;
