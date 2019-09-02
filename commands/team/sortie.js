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
var limited = ['Erlang Shen', 'Holly', 'Karma (Black)', 'Koharu', 'Sayo', 'Shinato', 'White Emperor']

class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'sortie',
            	group: 'team',
            	memberName: 'sortie',
            	description: 'add an unit to your main team',
		examples: ['&sortie quill aw saw'],
		hidden: true
        });
    }

    async run(message, input) {
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
		team.on('error', err => console.error('Keyv connection error:', err));
		var uteam = await team.get(message.author.id)
		if (uteam == undefined) {uteam = {}}
		const mainteam = new Keyv(process.env.MONGODB_URI, { namespace: 'mainteam' });
		mainteam.on('error', err => console.error('Keyv connection error:', err));
		var umainteam = await mainteam.get(message.author.id)
		if (umainteam == undefined) {message.channel.send("You haven't set your main team")}
		else {
			var mteam = uteam[umainteam]
			if (mteam["link"].length > 14) {message.channel.send("Full team")}
			else {
				var parts = input.toLowerCase().split(" ")
				var last = parts.pop()
				var saw = false
				if (last == "saw") {
					saw = true
				}
				else {
					parts.push(last)
				}
				last = parts.pop()
				var state = "base"
				if (last == "aw") {
					state = "AW"
				} 
				else if (last == "aw2") {
					state = "AW2"
				}
				else if (last == "aw2v1" || last == "v1") {
					state = "AW2v1"
				}
				else if (last == "aw2v2" || last == "v2") {
					state = "AW2v2"
				}
				else {
					parts.push(last)
				}
				var text = parts.join(" ")
				var unit = functions.nameChange(text)
				if (limited.includes(unit) && mteam["link"].includes(unit)) {message,channel.send("You can only have one " + unit + " per team")}
				else {
					if (state == "base") {
						var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png" 
					}
					else {
						var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_" + urlencode(state) + "_Icon.png" 
					}
					request(link, function(err, resp, html) {
						if (!err) {
							const $ = cheerio.load(html);
							var img = $('.fullImageLink a').attr('href')
							if (img) {
								mteam["link"].push(img)
								mteam["name"].push(unit)
								mteam["state"].push(state)
								mteam["saw"].push(saw)
								uteam[mainteam] = mteam
								team.set(message.author.id, uteam)
								message.channel.send("You added " + unit + " " + state + " to your main team");
							}
							else if (state == "AW2" || state == "AW2v1" || state == "AW2v2") {
								var link2 = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_" + urlencode(state) + "_Icon.png"
								request(link2, function(err2, resp2, html2) {
									if (!err2) {
										const $2 = cheerio.load(html2);
										var img2 = $('.fullImageLink a').attr('href')
										if (img2) {
											mteam["link"].push(img2)
											mteam["name"].push(unit)
											mteam["state"].push(state)
											mteam["saw"].push(saw)
											uteam[mainteam] = mteam
											team.set(message.author.id, uteam)
											message.channel.send("You added " + unit + " " + state + " to your main team");
										}
										else {message.channel.send("Wrong Input")}
									}
								})
							}
							else {message.channel.send("Wrong Input")}
						}
					})
				}
			}
		}
	}
}
module.exports = RanRoll;
