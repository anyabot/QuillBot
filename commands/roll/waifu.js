const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
var request = require('request');
var cheerio = require('cheerio');
var urlencode = require('urlencode');



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'waifu',
            	group: 'roll4',
            	memberName: 'waifu',
            	description: 'show your waifu',
		examples: ['&waifu']
        });
    }

    async run(message, input) {
		const waifu = new Keyv(process.env.MONGODB_URI, { namespace: 'waifu' });
	    waifu.on('error', err => console.error('Keyv connection error:', err));
		var uwaifu = await waifu.get(message.author.id)
		if (uwaifu == undefined) {
			var mes = "You haven't set your waifu."
			message.channel.send(mes)
		}
		else {
			var name
			var unit = uwaifu[0]
			var state = uwaifu[1]
			if (state == "BASE") {
				name = unit
			}
			else {
				name = unit + " " + state
			}
			var link = "https://aigis.fandom.com/wiki/File:" + urlencode(name) + "_Render.png";
				request(link, function(err, resp, html) {
				if (!err) {
					const $ = cheerio.load(html);
					var img = $('.fullImageLink a').attr('href')
					console.log(img)
					if (img) {
						var embed = new Discord.RichEmbed()
						embed.setTitle(unit)
						embed.setImage(img)
						message.channel.send(embed);
					}
				}
			})
		}
	}
}
module.exports = RanRoll;
