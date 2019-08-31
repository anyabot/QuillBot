const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
var functions = require('../../functions.js');


class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'remove',
            	group: 'roll3',
            	memberName: 'remove',
            	description: 'remove a unit from the barrack',
              args: [{
		    key: 'text',
			prompt: 'Which unit do you want to remove? (Input name or the index number from &barrack)',
		    type: 'string'
		}],
		examples: ['&remove 1']
        });
    }

    async run(message, { text }) {
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ubarrack = await barrack.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
	    if (ubarrack == [] || ubarrack == null || ubarrack.length == 0) {
			message.reply("You have no unit in the barrack")
		} 
		else if (!isNaN(text)) {
			var ind = parseInt(text)
			if (ind < 1 || ind > ubarrack.length) {message.reply("Wrong Index")}
			else {
			var unit = ubarrack[ind-1]
				var mes = "Do you want to remove " + unit + " from your barrack? (y/n)"
				message.channel.send(mes).then(msg => {

					msg.react('🇾').then( r => {
						msg.react('🇳')

						// Filters
						const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' || reaction.emoji.name === '🇳') && user.id === message.author.id;

						const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});

						backwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
								if (r.emoji.name === "🇳") {
								msg.edit("Cancelled")
							}
							else if (r.emoji.name === "🇾") {
								msg.edit("You removed " + ubarrack[ind - 1] + " from your barrack")
								for (var i = ind - 1 ; i < ubarrack.length - 1; i++) {
							ubarrack[i] = ubarrack[i+1]
							}
							ubarrack.pop()
							barrack.set(message.author.id, ubarrack)
							}
						})
					})
				})
			}
		}
	    else {
			var unit = functions.nameChange(text)
			if (barrack.includes(unit)) {
				var ind = barrack.indexOf(unit) + 1
				var mes = "Do you want to remove " + unit + " from your barrack? (y/n)"
				message.channel.send(mes).then(msg => {

					msg.react('🇾').then( r => {
						msg.react('🇳')

						// Filters
						const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' || reaction.emoji.name === '🇳') && user.id === message.author.id;

						const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});

						backwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
								if (r.emoji.name === "🇳") {
								msg.edit("Cancelled")
							}
							else if (r.emoji.name === "🇾") {
								msg.edit("You removed " + ubarrack[ind - 1] + " from your barrack")
								for (var i = ind - 1 ; i < ubarrack.length - 1; i++) {
							ubarrack[i] = ubarrack[i+1]
							}
							ubarrack.pop()
							barrack.set(message.author.id, ubarrack)
							}
						})
					})
				})
			}
			else {message.channel.send("Wrong Name")}
		}
	}
}
module.exports = RanRoll;
