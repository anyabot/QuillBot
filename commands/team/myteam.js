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
const xy = [[20, 80], [132, 80], [244, 80], [356, 80], [468, 80], [20, 192], [132, 192], [244, 192], [356, 192], [468, 192], [20, 304], [132, 304], [244, 304], [356, 304], [468, 304]]

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
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
	          team.on('error', err => console.error('Keyv connection error:', err));
            var uteam = await team.get(message.author.id)
            if (uteam == undefined) {uteam = []}
	    const canvas = Canvas.createCanvas(583, 426);
	    const ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage(__dirname + '/../../image/unknown.png');
	    ctx.drawImage(background, 0, 0)
	    ctx.translate(583, 426);
	    ctx.scale(-1, -1);
	    addimg(uteam, message, 0, canvas, ctx)
	}
}
async function addimg(uteam, message, i, canvas, ctx) {
	if (!(i < uteam.length)) {
		ctx.scale(-1, -1);
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'unknown.png');
	    message.channel.send(attachment);
	}
	var options = {
	    uri: uteam[i],
	    method: "get",
	    encoding: null
	  };
	  request(options, function (error, response, body) {
	    if (error) {
	      console.error('error:', error);
	    } 
	    else {
	    var img = new Canvas.Image();
		img.src = body;
		    var canvas2 = Canvas.createCanvas(img.width, img.height);
		    var ctx2 = canvas2.getContext('2d');
		    ctx2.scale(-1, -1);
	    ctx.drawImage(canvas2, xy[i][0], xy[i][1])
		addimg(uteam, message, i + 1, canvas, ctx)
	    }
	  })
}
module.exports = RanRoll;
