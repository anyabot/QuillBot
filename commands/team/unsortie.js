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
            	name: 'unsortie',
            	group: 'team',
            	memberName: 'unsortie',
            	description: 'remove an unit from your main team',
		examples: ['&unsortie 1'],
		hidden: true
        });
    }

    async run(message, input) {
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
		team.on('error', err => console.error('Keyv connection error:', err));
		var uteam = await team.get(message.author.id)
		if (uteam == undefined) {uteam = {}}
		const mainteam = new Keyv(process.env.MONGODB_URI, { namespace: 'mainteam' });
		mainteam.on('error', err => console.error('Keyv connection error:', err));
		var umainteam = await mainteam.get(message.author.id)
		if (umainteam == undefined) {message.channel.send("You haven't set your main team")}
		else {
			var mteam = uteam[umainteam]
			if (mteam["link"] == [] || mteam["link"] == null || mteam["link"].length == 0) {
				message.reply("You have no unit in the main team")
			} 
			else if (!isNaN(input)) {
				var ind = parseInt(input)
				if (ind < 1 || ind > mteam["link"].length) {message.reply("Wrong Index")}
				else {
					message.channel.send("Done")
					for (var i = ind - 1 ; i < mteam["link"].length - 1; i++) {
						mteam["link"][i] = mteam["link"][i+1]
						mteam["name"][i] = mteam["name"][i+1]
						mteam["state"][i] = mteam["state"][i+1]
						mteam["saw"][i] = mteam["saw"][i+1]
					}
					mteam["link"].pop()
					mteam["name"].pop()
					mteam["state"].pop()
					mteam["saw"].pop()
					uteam[mainteam] = mteam
					team.set(message.author.id, uteam)
				}
			}
			else {
				var unit = functions.nameChange(input)
				if (mteam["name"].includes(unit)) {
					var ind = mteam["name"].indexOf(unit) + 1
					message.channel.send("Done")
					for (var i = ind - 1 ; i < mteam["link"].length - 1; i++) {
						mteam["link"][i] = mteam["link"][i+1]
						mteam["name"][i] = mteam["name"][i+1]
						mteam["state"][i] = mteam["state"][i+1]
						mteam["saw"][i] = mteam["saw"][i+1]
					}
					mteam["link"].pop()
					mteam["name"].pop()
					mteam["state"].pop()
					mteam["saw"].pop()
					uteam[mainteam] = mteam
					team.set(message.author.id, uteam)
				}
				else {message.channel.send("Wrong Name")}
			}
		}
	}
}
module.exports = RanRoll;
