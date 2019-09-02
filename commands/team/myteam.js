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
const xy2 = [ [ 93, 93 ], [ 205, 93 ], [ 317, 93 ], [ 429, 93 ], [ 541, 93 ], [ 93, 205 ], [ 205, 205 ], [ 317, 205 ], [ 429, 205 ], [ 541, 205 ], [ 93, 317 ], [ 205, 317 ], [ 317, 317 ], [ 429, 317 ], [ 541, 317 ] ]
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
			ctx.drawImage(background, 0, 0)
			ctx.translate(583, 426);
			ctx.scale(-1, -1);
			addimg(uteam[teamname], message, 0, canvas, ctx, awicon, aw2icon)
		}
		else {message.channel.send("You have no team with that name")}
	}
}

async function addimg(uteam, message, i, canvas, ctx, awicon, aw2icon) {
	if (!(i < uteam["link"].length)) {
		ctx.translate(583, 426);
		ctx.scale(-1, -1);
		addicon(uteam, message, 0, canvas, ctx, awicon, aw2icon)
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
			addimg(uteam, message, i + 1, canvas, ctx, awicon, aw2icon)
			}
		})
	}
}
async function addicon(uteam, message, i, canvas, ctx, awicon, aw2icon) {
	if (!(i < uteam["link"].length)) {
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'unknown.png');
	    message.channel.send(attachment);
	}
	else {
		let state = uteam["state"][i]
		if (state == "AW") {
			ctx.drawImage(awicon, xy2[i][0], xy2[i][1])
			addicon(uteam, message, i + 1, canvas, ctx, awicon, aw2icon)
		}
		else if (state == "AW2" || state == "AW2v1" || state == "AW2v2") {
			ctx.drawImage(aw2icon, xy2[i][0], xy2[i][1])
			addicon(uteam, message, i + 1, canvas, ctx, awicon, aw2icon)
		}
		else {addicon(uteam, message, i + 1, canvas, ctx, awicon, aw2icon)}
	}
}
module.exports = RanRoll;
