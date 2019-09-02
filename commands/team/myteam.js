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

const xy = [ [ 464, 306 ], [ 352, 306 ], [ 240, 306 ], [ 128, 306 ], [ 16, 306 ], [ 464, 192 ], [ 352, 192 ], [ 240, 192 ], [ 128, 192 ], [ 16, 192 ], [ 464, 78 ], [ 352, 78 ], [ 240, 78 ], [ 128, 78 ], [ 16, 78 ] ]
const xy2 = [ [ 91, 93 ], [ 203, 93 ], [ 315, 93 ], [ 427, 93 ], [ 539, 93 ], [ 91, 207 ], [ 203, 207 ], [ 315, 207 ], [ 427, 207 ], [ 539, 207 ], [ 91, 321 ], [ 203, 321 ], [ 315, 321 ], [ 427, 321 ], [ 539, 321 ] ]
const xy3 = [ [ 96, 77 ], [ 208, 77 ], [ 320, 77 ], [ 432, 77 ], [ 544, 77 ], [ 96, 191 ], [ 208, 191 ], [ 320, 191 ], [ 432, 191 ], [ 544, 191 ], [ 96, 305 ], [ 208, 305 ], [ 320, 305 ], [ 432, 305 ], [ 544, 305 ] ]
class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
			name: 'myteam',
			group: 'team',
			memberName: 'myteam',
			description: 'your team',
			examples: ['&myteam main'],
			hidden: true,
			args: [{
				key: 'text',
				prompt: 'Which team do you want to see?',
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
			const canvas = Canvas.createCanvas(583, 426);
			const ctx = canvas.getContext('2d');
			const background = await Canvas.loadImage(__dirname + '/../../image/unknown.png');
			const awicon = await Canvas.loadImage(__dirname + '/../../image/AW_Icon.png');
			const aw2icon = await Canvas.loadImage(__dirname + '/../../image/AW2_Icon.png');
			const sawicon = await Canvas.loadImage(__dirname + '/../../image/SAW_Icon.png');
			ctx.drawImage(background, 0, 0)
			ctx.translate(583, 426);
			ctx.scale(-1, -1);
			addimg(uteam[teamname], message, 0, canvas, ctx, awicon, aw2icon, sawicon)
		}
		else {message.channel.send("You have no team with that name")}
	}
}

async function addimg(uteam, message, i, canvas, ctx, awicon, aw2icon, sawicon) {
	if (!(i < uteam["link"].length)) {
		ctx.translate(583, 426);
		ctx.scale(-1, -1);
		addicon(uteam, message, 0, canvas, ctx, awicon, aw2icon, sawicon)
	}
	else {
		var options = {
			uri: uteam["link"][i],
			method: "get",
			encoding: null
		};
		request(options, function (error, response, body) {
			if (error) {
			} 
			else {
			var img = new Canvas.Image();
			img.src = body;
			var canvas2 = Canvas.createCanvas(img.width, img.height);
			var ctx2 = canvas2.getContext('2d');
			ctx2.translate(img.width, img.height);
			ctx2.scale(-1, -1);
			ctx2.drawImage(img, 0, 0)
			ctx.drawImage(canvas2, xy[i][0], xy[i][1])
			addimg(uteam, message, i + 1, canvas, ctx, awicon, aw2icon, sawicon)
			}
		})
	}
}
async function addicon(uteam, message, i, canvas, ctx, awicon, aw2icon, sawicon) {
	if (!(i < uteam["link"].length)) {
		addsaw(uteam, message, 0, canvas, ctx, awicon, aw2icon, sawicon)
	}
	else {
		let state = uteam["state"][i]
		if (state == "AW") {
			ctx.drawImage(awicon, xy2[i][0], xy2[i][1])
		}
		else if (state == "AW2" || state == "AW2v1" || state == "AW2v2") {
			ctx.drawImage(aw2icon, xy2[i][0], xy2[i][1])
		}
		addicon(uteam, message, i + 1, canvas, ctx, awicon, aw2icon, sawicon)
	}
}
async function addsaw(uteam, message, i, canvas, ctx, awicon, aw2icon, sawicon) {
	if (!(i < uteam["link"].length)) {
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'unknown.png');
	    message.channel.send(attachment);
	}
	else {
		let saw = uteam["saw"][i]
		if (saw) {
			ctx.drawImage(sawicon, xy3[i][0], xy3[i][1])
		}
		addsaw(uteam, message, i + 1, canvas, ctx, awicon, aw2icon, sawicon)
	}
}
module.exports = RanRoll;
