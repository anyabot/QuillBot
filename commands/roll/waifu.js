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
			var embed = new Discord.RichEmbed()
			embed.setTitle(unit)
			send1(message, unit, embed, state)
		}
	}
}
async function send1(message, unit, embed, state) {
	var link = "https://aigis.fandom.com/wiki/" + urlencode(unit);
	request(link, function(err, resp, html) {
		if (!err) {
			const $ = cheerio.load(html);
			if (state == "BASE") {
				img = ($('.BaseGallery div:nth-child(2) a img').attr('data-src'));
				if (img) {
					let nam =($('.BaseGallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" Icon")
					if (pa.length > 1) {
						img = img.split("/scale-to-width-down/")[0]
					}
				}
				if (!img) {
					img = $('.image.lightbox img').attr('data-src')
						if (img) {
						let nam =($('.image.lightbox img').attr('alt'));
						let pa = nam.split(" Render")
						if (pa.length > 1) {
							img = img.split("/scale-to-width-down/")[0]
						}
					}
				}
			}
			if (state == "AW") {
				img = ($('.AWGallery div:nth-child(2) a img').attr('data-src'));
				if (img) {
					let nam =($('.AWGallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" Icon")
					if (pa.length > 1) {
						img = img.split("/scale-to-width-down/")[0]
					}
				}
				if (!img) {
					($('.image.lightbox')).each(function(i, elem) {
        					let img2 = $(this).find('img').attr('data-src')
        					let nam = $(this).find('img').attr('alt')
        					let pa = nam.split(" AW Render")
        					if (pa.length > 1) {
							nam = pa[0]		
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			if (state == "AW2") {
				if (img) {
					img = ($('.AW2Gallery div:nth-child(2) a img').attr('data-src'));
					let nam =($('.AW2Gallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" Icon")
					if (pa.length > 1) {
						img = img.split("/scale-to-width-down/")[0]
					}
				}
				if (!img) {
					($('.image.lightbox')).each(function(i, elem) {
        					let img2 = $(this).find('img').attr('data-src')
        					let nam = $(this).find('img').attr('alt')
        					let pa = nam.split(" AW2 Render")
        					if (pa.length > 1) {
							nam = pa[0]		
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			if (state == "AW2v1") {
				if (img) {
					img = ($('.AW2v1Gallery div:nth-child(2) a img').attr('data-src'));
					let nam =($('.AW2v1Gallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" Icon")
					if (pa.length > 1) {
						img = img.split("/scale-to-width-down/")[0]
					}
				}
				if (!img) {
					($('.image.lightbox')).each(function(i, elem) {
        					let img2 = $(this).find('img').attr('data-src')
        					let nam = $(this).find('img').attr('alt')
        					let pa = nam.split(" AW2v1 Render")
        					if (pa.length > 1) {
							nam = pa[0]		
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			if (state == "AW2v2") {
				if (img) {
					img = ($('.AW2v2Gallery div:nth-child(2) a img').attr('data-src'));
					let nam =($('.AW2v2Gallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" Icon")
					if (pa.length > 1) {
						img = img.split("/scale-to-width-down/")[0]
					}
				}
				if (!img) {
					($('.image.lightbox')).each(function(i, elem) {
        					let img2 = $(this).find('img').attr('data-src')
        					let nam = $(this).find('img').attr('alt')
        					let pa = nam.split(" AW2v2 Render")
        					if (pa.length > 1) {
							nam = pa[0]		
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			embed.setImage(img)
			embed.setURL(link)
			message.channel.send(embed)
		}
	})
}
module.exports = RanRoll;
