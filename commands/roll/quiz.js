const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
const random = require('random')
var urlencode = require('urlencode');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
var functions = require('../../functions.js');


class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'quiz',
            	group: 'roll2',
            	memberName: 'quiz',
            	description: 'just quiz',
		throttling: {
		usages: 1,
		duration: 60
	},
		examples: ['&quiz'],
		hidden: true
        });
    }

    async run(message, input) {
	    var link = "https://aigis.fandom.com/wiki/User_blog:Altter/Testing"

		request(link, function(err, resp, html) {
			if (!err) {
				const $ = cheerio.load(html);
				sendembed($, message)
			}
		})
	}
}
function sendembed($, message) {
	var len = $('.image.image-thumbnail.link-internal').length
	var ind = random.int(1, len)
	var unit = $('.image.image-thumbnail.link-internal').eq(ind).attr('title')
	var link2 = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Render.png";
	request(link2, function(err, resp, html) {
		if (!err) {
			const $2 = cheerio.load(html);
			var img = $2('.fullImageLink a').attr('href')
			const filter = response => {
				let nam = functions.nameChange(response.content)
				return unit == nam
			};
			let embed = new Discord.RichEmbed()
			embed.setImage(img)
			message.channel.send(embed).then(mes => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 18000, errors: ['time'] })
				.then(collected => {
					mes.delete()
					message.channel.send(collected.first().author.username + ' got the correct answer!\nTry again?').then(msg => {
						msg.react('🇾')
						const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' && !user.bot);
						const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});
						backwards.on('collect', r => {
							sendembed($, message) 
							msg.delete()
						})
					})
				})
				.catch(collected => {
					mes.delete()
					message.channel.send('Looks like nobody got the answer this time.\nCorrect answer: ' + unit +'\nTry again?').then(msg => {
						msg.react('🇾')
						const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' && !user.bot);
						const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});
						backwards.on('collect', r => {
							sendembed($, message) 
							msg.delete()
						})
					})
				})
			});
		}
	})
}
module.exports = RanRoll;
