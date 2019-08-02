const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
const random = require('random')
var urlencode = require('urlencode');
const Keyv = require('keyv');
require('@keyv/mongo')
var MONGODB_URI  = 'mongodb://heroku_z1nnxhdm:j6jsrki6cihje13qtli31qm4aj@ds359077.mlab.com:59077/heroku_z1nnxhdm'



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'credit',
            	group: 'ran',
            	memberName: 'credit',
            	description: 'gacha stimulator',
		examples: ['&roll'],
		args: [{
		    key: 'text',
			prompt: 'What pool do you want to pull from?',
		    type: 'string',
		default: "default"
		}]
        });
    }

    async run(message, { text }) {
		  const sc = new Keyv(MONGODB_URI, { namespace: 'users' });
      var usc = await sc.get(message.author.id)
      if (usc == undefined) {usc = 0}
      usc = usc +3;
      message.channel.send(usc)
				
	}
}
module.exports = RanRoll;
