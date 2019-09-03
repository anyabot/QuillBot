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


class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'quiz',
            	group: 'quiz',
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
	    if (message.channel.id != "618064541896671244") {message.channel.send("In quiz channel only")}
	    else {
		    var link = "https://aigis.fandom.com/wiki/User_blog:Altter/Testing"

			request(link, function(err, resp, html) {
				if (!err) {
					const $ = cheerio.load(html);
					var units = []
					$('.image.image-thumbnail.link-internal').each(function(i, elem) {
						units.push($(this).attr('title'))
					});
					for (var i = 0; i < units.length; i++) {
						var ind = random.int(1, units.length)
						var temp = units[i]
						units[i] = units[ind]
						units[ind] = temp
					}
					var score = {}
					sendembed(units, message, score)
				}
			})
	    }
	}
}
function sendembed(units, message, score) {
	var unit = units.pop()
	var link2 = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Render.png";
	request(link2, function(err, resp, html) {
		if (!err) {
			const $2 = cheerio.load(html);
			var img = $2('.fullImageLink a').attr('href')
			img = img.split("latest").join("latest/scale-to-height-down/500")
			console.log(img)
			const filter = response => {
				let nam = functions.nameChange(response.content)
				return unit == nam
			};
			var options = {
			    url: img,
			    method: "get",
			    encoding: null
			};
			request(options, function (error, response, body) {

			    if (error) {
				console.error('error:', error);
			    } else {
				fs.writeFileSync('test.jpg', body);
				var attachment = new Discord.Attachment('test.jpg', 'image.jpg');
				    const exampleEmbed = new Discord.RichEmbed()
				.attachFile(attachment)
				.setImage('attachment://image.jpg');
				message.channel.send(exampleEmbed).then(mes => {
				message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
					.then(collected => {
						mes.delete()
						checkquiz(collected.first(), unit)
						if (score[collected.first().author.id]) {score[collected.first().author.id] =score[collected.first().author.id] + 1}
						else {score[collected.first().author.id] = 1}
						message.channel.send(collected.first().author.username + ' got the correct answer!\nCorrect answer: ' + unit + '\nTry again?').then(msg => {
							msg.react('🇾')
							const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' && !user.bot);
							const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});
							msg.awaitReactions(backwardsFilter, { max: 1, time: 6000, errors: ['time'] })
							.then(collected => {
								sendembed(units, message, score) 
								msg.delete()
							})
							.catch(collected => {
								msg.delete()
								leader(message, score)
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
								sendembed(units, message, score) 
								msg.delete()
							})
							.catch(collected => {
								msg.delete()
								leader(message, score)
							})
						})
					})
				});
			    }
			})
		}
	})
}
async function checkquiz(ms, unit) {
	const quiz = new Keyv(process.env.MONGODB_URI, { namespace: 'quiz' });
	quiz.on('error', err => console.error('Keyv connection error:', err));
	var uquiz = await quiz.get(ms.author.id)
	if (uquiz == undefined) {uquiz = []}
	if (!uquiz.includes(unit)) {
		var score = await quiz.get("score")
		if (score == undefined) {score = {}}
		if (!score[ms.author.id]) {score[ms.author.id] = 0}
		score[ms.author.id] = score[ms.author.id] + 1
		uquiz.push(unit)
		quiz.set(ms.author.id, uquiz)
		quiz.set("score", score)
	}
}
function leader(message, score) {
		var items = Object.keys(score).map(function(key) {
			return [key, score[key]];
		});
		items.sort(function(first, second) {
			return second[1] - first[1];
		});
		var mes = "Ranking:"
		for (var i = 0; i < items.length; i ++) {
			let user = message.client.users.get(items[i][0]);
			let un = user.username
			let rank = i + 1
			mes = mes + "\n" + rank + "/ " + un + " : " + items[i][1]
		}
		message.channel.send(mes)
}
module.exports = RanRoll;
