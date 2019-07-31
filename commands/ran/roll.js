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
var urlencode = require('urlencode');

class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'roll',
		aliases: ['pull', 'gacha'],
            	group: 'ran',
            	memberName: 'roll',
            	description: 'gacha stimulator',
		examples: ['&roll'],
		args: [{
		    key: 'text',
			prompt: 'What pool do you want to pull from?',
		    type: 'string',
		default: "normal"
		}]
        });
    }

    async run(message, { text }) {
		var pool = text.toLowerCase();
		var embed = new Discord.RichEmbed()
		embed.setTitle("Gacha Roll Result")
		embed.setColor('WHITE')
		if (pool == "normal") {
			var rar = random.int(1, 100)
			if (rar < 4) {
				var ind = random.int(1, size_dict(black))
				var unit = black[ind]
			embed.setDescription("You rolled " + unit + " (Black)")
			}
			else if (rar < 14) {
				var ind = random.int(1, size_dict(plat))
				var unit = plat[ind]
				embed.setDescription("You rolled " + unit + " (Platinum)")
			}
			else if (rar < 64) {
				var ind = random.int(1, size_dict(gold))
				var unit = gold[ind]
				embed.setDescription("You rolled " + unit + " (Gold)")
			}
			else {
				var ind = random.int(1, size_dict(sil))
				var unit = sil[ind]
				embed.setDescription("You rolled " + unit + " (Silver)")
			}
			var img
			var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Render.png";
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
