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
            	name: 'mainteam',
            	group: 'team',
            	memberName: 'mainteam',
            	description: 'set your main team',
		examples: ['&mainteam teamname'],
		hidden: true,
    args: [{
		    key: 'text',
			prompt: 'Which team do you want to set as your mainteam?',
		    type: 'string'
		}]
        });
    }

    async run(message, {text}) {
	    const teamlist = new Keyv(process.env.MONGODB_URI, { namespace: 'teamlist' });
	          teamlist.on('error', err => console.error('Keyv connection error:', err));
            var uteamlist = await teamlist.get(message.author.id)
            if (uteamlist == undefined) {uteamlist = []}
	          const mainteam = new Keyv(process.env.MONGODB_URI, { namespace: 'mainteam' });
	          mainteam.on('error', err => console.error('Keyv connection error:', err));
    let teamname = text.toLowerCase()
    if (uteamlist.includes(teamname)) {
      mainteam.set(message.author.id, teamname)
      message.channel.send("You set " + teamname + " as your main team")
    }
    else {
      message.channel.send("You have no team with that name")
    }
	}
}
module.exports = RanRoll;
