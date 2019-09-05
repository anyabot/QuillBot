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
				var aw = false
				if (last == "saw") {
					saw = true
				}
				else {
					parts.push(last)
				}
				last = parts.pop()
				var state = "base"
				if (last == "cc") {
					state = "CC"
				}
				else if (last == "aw") {
					state = "AW"
					aw = true
				} 
				else if (last == "aw2") {
					state = "AW2"
					aw = true
				}
				else if (last == "aw2v1" || last == "v1") {
					state = "AW2v1"
					aw = true
				}
				else if (last == "aw2v2" || last == "v2") {
					state = "AW2v2"
					aw = true
				}
				else {
					parts.push(last)
				}
				var text = parts.join(" ")
				var unit = functions.nameChange(text)
				if (limited.includes(unit) && mteam["name"].includes(unit)) {message.channel.send("You can only have one " + unit + " per team")}
				else if (saw == true && aw == false) {message.channel.send("Only Awakened units can have SAW")}
				else {
					var link = "https://aigis.fandom.com/wiki/" + urlencode(unit)
					request(link, function(err, resp, html) {
						if (!err) {
							const $ = cheerio.load(html);
							var img 
							var output
							var unitcheck = $('.categories').text().includes("Player Units")
							var black = $('.categories').text().includes("Rarity:Black")
							var baseimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'))
							var baseimg2 = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('src'))
							var awimg = ($('.c3 td:first-child div a img').attr('data-src'))
							var awimg2 = ($('.c3 td:first-child div a img').attr('src'))
							var v1img = ($('.c4 td:first-child div a img').attr('data-src'))
							var v1img2 = ($('.c4 td:first-child div a img').attr('src'))
							var v2img = ($('.c5 td:first-child div a img').attr('data-src'))
							var v2img2 = ($('.c5 td:first-child div a img').attr('src'))
							if (!unitcheck) {message.channel.send("There is no unit with such name")}
							else if (black && (state = "AW2")) {message.channel.send("Please specify AW2v1 or AW2v2")}
							else if (state == "CC" && !($('.c2.numbers').first().text())) {message.channel.send("Unit doesn't have CC")}
							else if (state == "AW" && !($('.c3.numbers').first().text())) {message.channel.send("Unit doesn't have AW")}
							else if (state == "AW2v1" && !($('.c4.numbers').first().text())) {message.channel.send("Unit doesn't have AW2v1")}
							else if (state == "AW2v2" && !($('.c5.numbers').first().text())) {message.channel.send("Unit doesn't have AW2v2")}
							else if (state == "AW2" && !($('.c5.numbers').first().text()) && !($('.c4.numbers').first().text())) {message.channel.send("Unit doesn't have AW2")}
							else if (state == "AW2") {
								if (v2img2) {img = v2img2}
								else if (v2img) {img = v2img}
								else if (v1img2) {img = v1img2}
								else if (v1img) {img = v1img}
								else if (awimg2) {img = awimg2}
								else if (awimg) {img = awimg}
								else if (baseimg2) {img = baseimg2}
								else if (baseimg) {img = baseimg}
							}
							else if (state == "AW2v1") {
								if (v1img2) {img = v1img2}
								else if (v1img) {img = v1img}
								else if (awimg2) {img = awimg2}
								else if (awimg) {img = awimg}
								else if (baseimg2) {img = baseimg2}
								else if (baseimg) {img = baseimg}
							}
							else if (state == "AW2v2") {
								if (v2img2) {img = v2img2}
								else if (v2img) {img = v2img}
								else if (awimg2) {img = awimg2}
								else if (awimg) {img = awimg}
								else if (baseimg2) {img = baseimg2}
								else if (baseimg) {img = baseimg}
							}
							else if (state == "AW2") {
								if (awimg2) {img = awimg2}
								else if (awimg) {img = awimg}
								else if (baseimg2) {img = baseimg2}
								else if (baseimg) {img = baseimg}
							}
							else {
								if (baseimg2) {img = baseimg2}
								else if (baseimg) {img = baseimg}
							}
							if (img) {
								img = img.split('/scale-to-width-down/')[0]
								mteam["link"].push(img)
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
			}
		}
	}
}
module.exports = RanRoll;
