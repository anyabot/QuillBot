const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var functions = require('../../functions.js');
require('@gouch/to-title-case')
var urlencode = require('urlencode');

class FindSkill extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'skill',
			group: 'find',
			memberName: 'skill',
			description: 'find skill and saw of an unit',
			examples: ['&skill quill'],
			args: [{
				key: 'text',
				prompt: 'What unit do you want to know about?',
				type: 'string'
			}]
		});
	}

	async run(message, { text }) {
		var unit = functions.nameChange(text)
		var link = "https://aigis.fandom.com/wiki/" + urlencode(unit);
		request(link, function (err, resp, html) {
			if (!err) {
				const $ = cheerio.load(html);
				var check = false;
				var pages = [];
				var page = 1;
				var img;
				var output;
				var aw = false
				var embed1 = new Discord.MessageEmbed()
				var embed2 = new Discord.MessageEmbed()
				embed1.setFooter('React N for Normal Skill or A for Awakened Skill');
				embed2.setFooter('React N for Normal Skill or A for Awakened Skill');
				$('.wikitable').each(function (i, elem) {
					output = $(elem).first().text();
					let ar = te(output);
					output = $(elem).find('tr').eq(1).text();
					let aa = te(output);
					if (ar[0].trim() === 'Unit' && aa[1] === "Normal") {
						check = true;
						let siz = $(elem).find('tr').length;
						img = $(elem).find('tr').eq(1).find('td').find('div').find('a').find('img').attr('data-src');
						let out = $(elem).find('tr').eq(1).text();
						let aa = te(out);
						embed1.setTitle(unit + "'s Normal Skill")
						embed1.setURL(link)
						embed1.setThumbnail(img)
						embed1.addField(aa[2], aa[3] + "\n**CD: **" + aa[4] + "\n**Initial: **" + aa[5]);
						embed1.setColor('BLUE')
						for (var i = 2; i < siz; i++) {
							output = $(elem).find('tr').eq(i).text();
							let aa = te(output);
							if (aa[0] === "Awakened") {
								aw = true;
								pages.push(embed1)
								embed2.setTitle(unit + "'s Awakened Skill")
								embed2.setURL(link)
								embed2.setThumbnail(img)
								embed2.setColor('GOLD')
								embed2.addField(aa[1], aa[2] + "\n**CD: **" + aa[3] + "\n**Initial: **" + aa[4]);
							}
							else if (!aw) {
								embed1.addField(aa[0], aa[1] + "\n**CD: **" + aa[2] + "\n**Initial: **" + aa[3]);
							}
							else {
								embed2.addField(aa[0], aa[1] + "\n**CD: **" + aa[2] + "\n**Initial: **" + aa[3]);
							}

						}
						pages.push(embed2);

					}
				})
				if (check) {
					var embed = pages[0];
					message.channel.send(embed).then(msg => {

						msg.react('🇳').then(r => {
							msg.react('🇦')

							// Filters
							const backwardsFilter = (reaction, user) => reaction.emoji.name === '🇳' && !user.bot;
							const forwardsFilter = (reaction, user) => reaction.emoji.name === '🇦' && !user.bot;

							const backwards = msg.createReactionCollector(backwardsFilter, { timer: 6000 });
							const forwards = msg.createReactionCollector(forwardsFilter, { timer: 6000 });

							backwards.on('collect', (r, u) => {
								r.users.remove(u).catch(e => console.log(e))
								embed = pages[0];
								msg.edit(embed)
							})

							forwards.on('collect', (r, u) => {
								r.users.remove(u).catch(e => console.log(e))
								embed = pages[1];
								msg.edit(embed)
							})
						})
					})
				}
				if (!check) {
					output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(13)').first().html();
					if (output && output != "N/A") {
						var nna = na(output);
						img = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
						link = "https://aigis.fandom.com/wiki/Skill/" + urlencode(nna);

						request(link, function (err, resp, html) {
							if (!err) {
								check = true
								const $2 = cheerio.load(html);
								let output2 = $2('.gcstyle:first-child tr:nth-child(5)').not(function (i, el) {
									return $(this).find('td').attr('class') != 'bgbeige';
								}).html()
								output = $2('.gcstyle:nth-child(2) tr:last-child').html()
								output = na(output)
								var xyz = output.split(" ")
								xyz = xyz.filter(function (el) {
									return el != null && el != '';
								});
								var len = xyz.length
								output = $2('.gcstyle:first-child tr:nth-child(3)').html()
								output = output.replace(/<b>X<\/b>/g, xyz[1]);
								output = output.replace(/<b>Y<\/b>/g, xyz[2]);
								output = output.replace(/<b>Z<\/b>/g, xyz[3]);
								output = na(output)
								var embed3 = new Discord.MessageEmbed()
								embed3.setTitle("Skill")
								embed3.setURL("https://aigis.fandom.com/wiki/" + urlencode(unit))
								embed3.setThumbnail(img)
								if (!output2) { embed3.addField(nna, output + "\n**CD: **" + xyz[len - 1]) }
								if (output2) {
									output2 = output2.replace(/<b>X<\/b>/g, xyz[1]);
									output2 = output2.replace(/<b>Y<\/b>/g, xyz[2]);
									output2 = output2.replace(/<b>Z<\/b>/g, xyz[3]);
									output2 = na(output2)
									embed3.addField(nna, output + "\n" + output2 + "\n**CD: **" + xyz[len - 1])
								}
								embed3.setColor('BLUE')
								message.channel.send(embed3)
							}
						})
					}
					else { message.channel.send("No Data") }
				}
			}
		});
	}
}

function te(output) {
	output = output.replace(/<[^>]*>/g, "\n");
	output = output.replace(/\n+ /g, "\n");
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
		return el != null && el != '';
	});
	return filtered;
}
function na(output) {
	output = output.replace(/<[^>]*>/g, "\n");
	output = output.replace(/\n+ /g, "\n");
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
		return el != null && el != '';
	});
	var na = filtered[0];
	let i = 1;
	while (i < filtered.length) {
		na = na + " " + filtered[i];
		i++;
	}
	return na;
}
module.exports = FindSkill;
