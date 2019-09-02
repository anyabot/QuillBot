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
            	name: 'addteam',
            	group: 'team',
            	memberName: 'addteam',
            	description: 'add a blank team (max 10)',
		examples: ['&addteam teamname'],
		hidden: true,
    args: [{
		    key: 'text',
			prompt: 'Which team do you want to add?',
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
    let teamname = text.toLowerCase()
    if (uteamlist.length > 9) {"You already have 10 teams"}
    else if (teamname == "main") {message.channel.send("You can't set team name to `main`")}
    else if (uteamlist.includes(teamname)) {message.channel.send("You already have a team with that name")}
    else {
      uteamlist.push(teamname)
	uteam[teamname]	= {"link" : [], "name" : [], "state" : [], "saw" : []}			    
      teamlist.set(message.author.id, uteamlist)
	team.set(message.author.id, uteam)
	    message.channel.send("You add team: " + teamname)
    }
	}
}
module.exports = RanRoll;
