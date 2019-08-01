const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
const random = require('random')
var black = require('../../library/black.js').black;
var plat = require('../../library/plat.js').plat;
var gold = require('../../library/gold.js').gold;
var sil = require('../../library/sil.js').sil;
var iblack = require('../../library/iblack.js').iblack;
var iplat = require('../../library/iplat.js').iplat;
var igold = require('../../library/igold.js').igold;
var isil = require('../../library/isil.js').isil;
var pugblack = require('../../library/pugblack.js').pugblack;
var pugplat = require('../../library/pugplat.js').pugplat;
var urlencode = require('urlencode');

class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'roll',
		aliases: ['pull', 'gacha', 'draw'],
            	group: 'ran',
            	memberName: 'roll',
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
		var pool = text.toLowerCase();
		var embed = new Discord.RichEmbed()
		if (pool == "default") {
			embed.setTitle("Gacha Roll Result")
			var rar = random.int(1, 100)
			if (rar < 4) {
				var ind = random.int(1, size_dict(black))
				var unit = black[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
				embed.setColor([95, 64, 0])
			}
			else if (rar < 14) {
				var ind = random.int(1, size_dict(plat))
				var unit = plat[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
				embed.setColor('GREEN')
			}
			else if (rar < 64) {
				var ind = random.int(1, size_dict(gold))
				var unit = gold[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
				embed.setColor('GOLD')
			}
			else {
				var ind = random.int(1, size_dict(sil))
				var unit = sil[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
				embed.setColor('WHITE')
			}
			var img
			var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
			request(link, function(err, resp, html) {
				if (!err) {
					const $ = cheerio.load(html);
					img = $('.fullImageLink a').attr('href')
					embed.setImage(img)
					message.channel.send(embed)
				}
			})
		}
	    else if (pool == "imperial" || pool == "white empire") {
			embed.setTitle("Imperial Gacha Roll Result")
			var rar = random.int(1, 100)
			if (rar < 4) {
				var ind = random.int(1, size_dict(iblack))
				var unit = iblack[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
				embed.setColor([95, 64, 0])
			}
			else if (rar < 14) {
				var ind = random.int(1, size_dict(iplat))
				var unit = iplat[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
				embed.setColor('GREEN')
			}
			else if (rar < 64) {
				var ind = random.int(1, size_dict(igold))
				var unit = igold[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
				embed.setColor('GOLD')
			}
			else {
				var ind = random.int(1, size_dict(isil))
				var unit = isil[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
				embed.setColor('WHITE')
			}
			var img
			var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
			request(link, function(err, resp, html) {
				if (!err) {
					const $ = cheerio.load(html);
					img = $('.fullImageLink a').attr('href')
					embed.setImage(img)
					message.channel.send(embed)
				}
			})
		}
		else if (pool == "pug" || pool == "pick-up" || pool == "pickup") {
			embed.setTitle("Pick-Up Gacha Roll Result")
			var rar = random.int(1, 100)
			if (rar < 4) {
				var ind = random.int(1, size_dict(pugblack))
				var unit = pugblack[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
				embed.setColor([95, 64, 0])
			}
			else if (rar < 14) {
				var ind = random.int(1, size_dict(pugplat))
				var unit = pugplat[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
				embed.setColor('GREEN')
			}
			else if (rar < 64) {
				var ind = random.int(1, size_dict(gold))
				var unit = gold[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
				embed.setColor('GOLD')
			}
			else {
				var ind = random.int(1, size_dict(sil))
				var unit = sil[ind]
				embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
				embed.setColor('WHITE')
			}
			var img
			var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
			request(link, function(err, resp, html) {
				if (!err) {
					const $ = cheerio.load(html);
					img = $('.fullImageLink a').attr('href')
					embed.setImage(img)
					message.channel.send(embed)
				}
			})
		}
		else (message.channel.send("Wrong Input"))
	}
}
function size_dict(d){
	c=0; 
	for (i in d) ++c;
	return c
}
module.exports = RanRoll;
