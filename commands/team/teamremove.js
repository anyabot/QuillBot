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
            	name: 'teamremove',
            	group: 'team',
            	memberName: 'teamremove',
            	description: 'remove an unit from your team',
		examples: ['&teamremove 1'],
		hidden: true
        });
    }

    async run(message, input) {
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
	    team.on('error', err => console.error('Keyv connection error:', err));
		var uteam = await team.get(message.author.id)
		if (uteam == undefined) {uteam = []}
		if (uteam == [] || uteam == null || uteam.length == 0) {
			message.reply("You have no unit in the team")
		} 
		else if (!isNaN(input)) {
			var ind = parseInt(input)
			if (ind < 1 || ind > uteam.length) {message.reply("Wrong Index")}
			else {
				message.channel.send("Done")
				for (var i = ind - 1 ; i < uteam.length - 1; i++) {
					uteam[i] = uteam[i+1]
				}
				uteam.pop()
				team.set(message.author.id, uteam)
			}
		}
		else {message.channel.send("Input must be a number")}
	}
}
module.exports = RanRoll;
