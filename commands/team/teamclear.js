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
		examples: ['&teamclear main'],
		hidden: true,
		args: [{
				key: 'text',
				prompt: 'Which team do you want to clear?',
				type: 'string',
				default: "main"
			}]
        });
    }

    async run(message, {text}) {
	    const teamlist = new Keyv(process.env.MONGODB_URI, { namespace: 'teamlist' });
		teamlist.on('error', err => console.error('Keyv connection error:', err));
		var uteamlist = await teamlist.get(message.author.id)
		if (uteamlist == undefined) {uteamlist = []}
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
		team.on('error', err => console.error('Keyv connection error:', err));
		var uteam = await team.get(message.author.id)
		if (uteam == undefined) {uteam = {}}
		var teamname = text.toLowerCase()
		if (teamname == "main") {
			const mainteam = new Keyv(process.env.MONGODB_URI, { namespace: 'mainteam' });
			mainteam.on('error', err => console.error('Keyv connection error:', err));
			var umainteam = await mainteam.get(message.author.id)
			teamname = umainteam
		}
		if (teamname == undefined) {message.channel.send("You haven't set your main team")}
		else if (uteamlist.includes(teamname)) {
			var mes = "Do you want to remove all units from your `" + teamname + "` team? (y/n)"
			message.channel.send(mes).then(msg => {
				msg.react('🇾').then( r => {
					msg.react('🇳')
					const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' || reaction.emoji.name === '🇳') && user.id === message.author.id;

					const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});

					backwards.on('collect', r => {
						r.remove(r.users.filter(u => !u.bot).first());
							if (r.emoji.name === "🇳") {
							msg.edit("Cancelled")
						}
						else if (r.emoji.name === "🇾") {
							msg.edit("You removed all units from your team")
							uteam[teamname]	= {"link" : [], "name" : [], "state" : [], "saw" : []}
							team.set(message.author.id, uteam)
						}
					})
				})
			})
		}
	}
}
module.exports = RanRoll;
