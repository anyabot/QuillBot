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
        			var units = []
				$('.image.image-thumbnail.link-internal').each(function(i, elem) {
          				units.push($(this).attr('title'))
        			});
				sendembed(units, message)
			}
		})
	}
}
function sendembed(units, message) {
	var ind = random.int(1, units.length)
	var unit = units[ind-1]
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
					const quiz = new Keyv(process.env.MONGODB_URI, { namespace: 'quiz' });
	    				quiz.on('error', err => console.error('Keyv connection error:', err));
					var uquiz = await quiz.get(collected.first().author.id)
					if (uquiz == undefined) {uquiz = []}
					if (!uquiz.includes(unit)) {
						var score = await quiz.get("score")
						if (score == undefined) {score = {}}
						if (!score[collected.first().author.id]) {score[collected.first().author.id] = 0}
						score[collected.first().author.id] = score[collected.first().author.id] + 1
						uquiz.push(unit)
						quiz.set(collected.first().author.id, uquiz)
						quiz.set("score", score)
					}
					message.channel.send(collected.first().author.username + ' got the correct answer!\nTry again?').then(msg => {
						msg.react('🇾')
						const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' && !user.bot);
						const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});
						msg.awaitReactions(backwardsFilter, { max: 1, time: 6000, errors: ['time'] })
						.then(collected => {
							sendembed(units, message) 
							msg.delete()
						})
						.catch(collected => {
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
						msg.awaitReactions(backwardsFilter, { max: 1, time: 6000, errors: ['time'] })
						.then(collected => {
							sendembed(units, message) 
							msg.delete()
						})
						.catch(collected => {
							msg.delete()
						})
					})
				})
			});
		}
	})
}
module.exports = RanRoll;
