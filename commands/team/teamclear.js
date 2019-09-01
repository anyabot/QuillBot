const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
const random = require('random')
var urlencode = require('urlencode');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
const Canvas = require('canvas');
var functions = require('../../functions.js');
var fs = require('fs');

class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'teamclear',
            	group: 'team',
            	memberName: 'teamclear',
            	description: 'remove all units from your team',
		examples: ['&teamremove'],
		hidden: true
        });
    }

    async run(message, input) {
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
	    team.on('error', err => console.error('Keyv connection error:', err));
		var mes = "Do you want to remove all units from your team? (y/n)"
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
						msg.edit("You removed all units from your team")
						team.set(message.author.id, [])
					}
				})
			})
		})
	}
}
module.exports = RanRoll;
