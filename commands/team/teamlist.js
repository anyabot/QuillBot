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
            	name: 'teamlist',
            	group: 'team',
            	memberName: 'teamlist',
            	description: 'list all your team',
		examples: ['&teamlist'],
		hidden: true
        });
    }

    async run(message, {text}) {
	    const teamlist = new Keyv(process.env.MONGODB_URI, { namespace: 'teamlist' });
	          teamlist.on('error', err => console.error('Keyv connection error:', err));
            var uteamlist = await teamlist.get(message.author.id)
            if (uteamlist == undefined) {uteamlist = []}
	          if (uteamlist == [] || uteamlist == null || uteamlist.length == 0) {
			message.reply("You have no team")
		} 
    else {
      var mes = "Your team list:"
      for (var i = 0; i < uteamlist.length; i++) {
        mes = mes + "\n" + uteamlist[i]
      }
      message.reply(mes)
    }
	}
}
module.exports = RanRoll;
