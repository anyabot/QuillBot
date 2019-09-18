const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'setwaifu',
            	group: 'roll4',
            	memberName: 'setwaifu',
            	description: 'set a character in the barrack as your waifu',
              args: [{
		    key: 'text',
			prompt: 'Which unit do you want to make your waifu? (Input the index number from &barrack)',
		    type: 'string'
		}],
		examples: ['&setwaifu 1']
        });
    }

    async run(message, { text }) {
	    var parts = text.split(" ")
	    if (parts[0] == "&remove") {parts.shift()}
	    var text2 = parts.join(" ")
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ubarrack = await barrack.get(message.author.id)
		const waifu = new Keyv(process.env.MONGODB_URI, { namespace: 'waifu' });
	    waifu.on('error', err => console.error('Keyv connection error:', err));
		var uwaifu = await waifu.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
	    if (ubarrack == [] || ubarrack == null || ubarrack.length == 0) {
			message.reply("You have no unit in the barrack")
		} 
		else if (!isNaN(text2)) {
			var ind = parseInt(text2)
			if (ind < 1 || ind > ubarrack.length) {message.reply("Wrong Index")}
			else if (uwaifu == undefined) {
				var unit = ubarrack[ind-1]
				var mes = "You set " + unit + " as your waifu."
				message.channel.send(mes)
				var uunit = [unit, "BASE"]
				waifu.set(message.author.id, uunit)
			}
			else {
				var unit = ubarrack[ind-1]
				var mes = "You've already set " + uwaifu[0] + " as your waifu.\nDo you want to change to " + unit + "? (y/n)"
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
								msg.edit("You set " + unit + " as your waifu.")
								var uunit = [unit, "BASE"]
								waifu.set(message.author.id, uunit)
							}
						})
					})
				})
			}
		}
		else {
			var unit = functions.nameChange(text2)
			if (ubarrack.includes(unit)) {
				var ind = ubarrack.indexOf(unit) + 1;
				if (uwaifu == undefined) {
					var unit = ubarrack[ind-1]
					var mes = "You set " + unit + " as your waifu."
					message.channel.send(mes)
					var uunit = [unit, "BASE"]
					waifu.set(message.author.id, uunit)
				}
				else {
					var mes = "You've already set " + uwaifu[0] + " as your waifu.\nDo you want to change to " + unit + "? (y/n)"
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
									msg.edit("You set " + unit + " as your waifu.")
									var uunit = [unit, "BASE"]
									waifu.set(message.author.id, uunit)
								}
							})
						})
					})
				}
			}
		}
	}
}
module.exports = RanRoll;
