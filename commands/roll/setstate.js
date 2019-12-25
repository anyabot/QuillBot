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
            	name: 'setstate',
            	group: 'roll4',
            	memberName: 'setstate',
            	description: 'set the state of your waifu (AA, AW)',
		examples: ['&setstate base']
        });
    }

    async run(message, input) {
		var state = input.toUpperCase()
		if (state == "AW2V1") {state = "AW2v1"}
	    	if (state == "AW2V2") {state = "AW2v2"}
	    	if (state == "AA AW2V1") {state = "AA AW2v1"}
	    	if (state == "AA AW2V2") {state = "AA AW2v2"}
		const waifu = new Keyv(process.env.MONGODB_URI, { namespace: 'waifu' });
	    waifu.on('error', err => console.error('Keyv connection error:', err));
		var uwaifu = await waifu.get(message.author.id)
		if (uwaifu == undefined) {
			var mes = "You haven't set your waifu."
			message.channel.send(mes)
		}
		else {
			var unit = uwaifu[0]
			send1(message, unit, state, waifu)
		}
	}
}
async function send1(message, unit, state, waifu) {
	var link = "https://aigis.fandom.com/wiki/" + urlencode(unit);
	request(link, function(err, resp, html) {
		if (!err) {
			const $ = cheerio.load(html);
			if (state == "BASE") {
				img = ($('.BaseGallery div:nth-child(2) a img').attr('data-src'));
				if (img) {
					let nam =($('.BaseGallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" Render")
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
			else if (state == "AW") {
				img = ($('.AWGallery div:nth-child(2) a img').attr('data-src'));
				if (img) {
					let nam =($('.AWGallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" AW Render")
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
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			else if (state == "AW2") {
				if (img) {
					img = ($('.AW2Gallery div:nth-child(2) a img').attr('data-src'));
					let nam =($('.AW2Gallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" AW2 Render")
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
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			else if (state == "AW2v1") {
				if (img) {
					img = ($('.AW2v1Gallery div:nth-child(2) a img').attr('data-src'));
					let nam =($('.AW2v1Gallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" AW2v1 Render")
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
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			else if (state == "AW2v2") {
				if (img) {
					img = ($('.AW2v2Gallery div:nth-child(2) a img').attr('data-src'));
					let nam =($('.AW2v2Gallery div:nth-child(2) a img').attr('alt'));
					let pa = nam.split(" AW2v2 Render")
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
							img = img2.split("/scale-to-width-down/")[0]
						}
				      });
				}
			}
			else {
				for (var i = 1; i < 5; i++) {
      					let img2 = ($('.AVer\\.Gallery div:nth-child(' + i + ') a img').attr('data-src'));
      					if (img) {
        					let nam =($('.AVer\\.Gallery div:nth-child(' + i + ') a img').attr('alt'));
        					let pa = nam.split(" " + state " Render")
        					if (pa.length > 1) {
          						img = img2.split("/scale-to-width-down/")[0]
        					}
      					}
    				}
			}
			if (img) {
				message.channel.send(embed)
				var embed = new Discord.RichEmbed()
				embed.setTitle(unit)
				embed.setURL(link)
				embed.setImage(img)
				message.channel.send(embed);
				var uunit = [unit, state]
				waifu.set(message.author.id, uunit)
			}
			else {message.channel.send("Wrong state input")}
		}
	})
}
module.exports = RanRoll;
