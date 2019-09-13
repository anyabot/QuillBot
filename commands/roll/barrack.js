const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'barrack',
		aliases: ['barracks'],
            	group: 'roll3',
            	memberName: 'barrack',
            	description: 'check your barrack',
		examples: ['&barrack']
        });
    }

    async run(message, input) {
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ubarrack = await barrack.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
	    if (ubarrack == [] || ubarrack == null || ubarrack.length == 0) {
			message.reply("You have no unit in the barrack")
		} 
		else {
			var pages = [];
			var page = 1;
			var len = ubarrack.length
			var embed = new Discord.RichEmbed()
			embed.setTitle(message.author.tag + "'s Barrack")
			for (var j = 0; j < len; j++) {
				if (j%24 == 0 && j != 0) {
					pages.push(embed)
					embed = new Discord.RichEmbed()
					embed.setTitle("" + message.author.tag + "'s Barrack")
					embed.addField("Unit No." + (j + 1), ubarrack[j], true)
				}
				else {
					embed.addField("Unit No." + (j + 1), ubarrack[j], true)
				}
			}
			pages.push(embed)
			embed = pages[0];
			embed.setFooter('Page ' + page + ' of ' + pages.length);
			message.channel.send(embed).then(msg => {
				msg.react('⬅').then( r => {
					msg.react('➡')

					// Filters
					const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && !user.bot;
					const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && !user.bot;

					const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
					const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});

					backwards.on('collect', r => {
					r.remove(r.users.filter(u => !u.bot).first());
						if (page === 1) return;
						page--;
							embed = pages[page-1];
							embed.setFooter('Page ' + page + ' of ' + pages.length);
							msg.edit(embed)
					})

					forwards.on('collect', r => {
					r.remove(r.users.filter(u => !u.bot).first());
							if (page === pages.length) return;
							page++;
							embed = pages[page-1];
							embed.setFooter('Page ' + page + ' of ' + pages.length);
							msg.edit(embed)
					})
				})
			})
		}
	}
}
module.exports = RanRoll;
