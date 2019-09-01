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
            	name: 'myteam',
            	group: 'team',
            	memberName: 'myteam',
            	description: 'your team',
		examples: ['&myteam'],
		hidden: true
        });
    }

    async run(message, input) {
	    const xy = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
	          team.on('error', err => console.error('Keyv connection error:', err));
            var uteam = await team.get(message.author.id)
            if (uteam == undefined) {uteam = []}
	    const canvas = Canvas.createCanvas(583, 426);
	    const ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage(__dirname + '/../../image/unknown.png');
	    ctx.drawImage(background, 0, 0)
	    var uimg = []
	    for (var i = 0; i < uteam.length; i++) {
	    	let img = Canvas.loadImage(uteam[i])
		ctx.drawImage(img, xy[i][0], xy[i][1])
	    }
      const attachment = new Discord.Attachment(canvas.toBuffer(), 'unknown.png');
	    message.channel.send(attachment);
	}
}
module.exports = RanRoll;
