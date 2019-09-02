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
            const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
	          team.on('error', err => console.error('Keyv connection error:', err));
            var uteam = await team.get(message.author.id)
            if (uteam == undefined) {uteam = {}}
	          const mainteam = new Keyv(process.env.MONGODB_URI, { namespace: 'mainteam' });
	          mainteam.on('error', err => console.error('Keyv connection error:', err));
            var umainteam = await mainteam.get(message.author.id)
    let teamname = text.toLowerCase()
    if (uteamlist.includes(teamname)) {
      for (var i = 0; i < uteamlist.length - 1; i++) {
        var start = false
        if (uteamlist[i] == teamname) {
          start = true
        }
        if (start) {
          uteamlist[i] = uteamlist[i+1]
        }
      }
      uteamlist.pop()
      if (umainteam == teamname) {mainteam.set(message.author.id, null)}
      delete uteam[teamname]
      teamlist.set(message.author.id, uteamlist)
      team.set(message.author.id, uteam)
      message.channel.send("You removed team: " + teamname)
    }
    else {
      message.channel.send("You have no team with that name")
    }
	}
}
module.exports = RanRoll;
