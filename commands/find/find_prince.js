const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var name = require('../../library/pri.js').name;
require('@gouch/to-title-case')
var urlencode = require('urlencode');
var striptags = require('striptags');
var functions = require('../../functions.js');

class FindPrince extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'prince',
			aliases: ['p'],
			group: 'find',
			memberName: 'prince',
			description: 'find data of AW prince',
			examples: ['&prince'],
			args: [{
				key: 'text',
				prompt: 'What AW Prince do you want to know about?',
				type: 'string',
				default: "all"
			}]
		});
	}

	async run(message, { text }) {
		var link = "https://aigis.fandom.com/wiki/Prince";
		request(link, function (err, resp, html) {
			if (!err) {
				var unit = text.toLowerCase().toTitleCase();
				if (name[unit]) unit = name[unit];
				const $ = cheerio.load(html);
				var output;
				var img;
				var des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(2) td:nth-child(2)').html());
				if (unit == "All") {
					var awlist = awl($('.unit-infobox.hidden').first().html())
					var page = 1;
					var pages = []
					var embed
					awlist.forEach(function (ele) {
						console.log(ele);
						let awna;
						if (ele == "Sacred Gear") { awna = "SacredEquipment" }
						else (awna = ele.split(' ').join(''))
						let aw1 = awna + "MStatBox"
						let hp;
						let atk;
						let def;
						let ran
						output = $('.' + aw1 + ' table tbody tr:nth-child(3)').first().text();
						let lv1v1 = lv1line(output);
						output = $('.' + aw1 + ' table tbody tr:nth-child(8)').first().text();
						if (output) {
							let lv99v1 = lv1line(output);
							hp = lv99v1[2]
							atk = lv99v1[4]
							def = lv99v1[6]
							output = $('.' + aw1 + ' table tbody tr:nth-child(6) td:nth-child(5)').first().html();
							ran = range(output);
						}
						else {
							hp = lv1v1[8]
							atk = lv1v1[10]
							def = lv1v1[12]
							output = $('.' + aw1 + ' table tbody tr:nth-child(4)').first().html();
							ran = range(output);
						}
						img = ($('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
						output = $('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(3)').first().html();
						let nam = na(output);
						embed = new Discord.MessageEmbed()
						embed.setURL(link)
						embed.setTitle(nam)
						embed.setThumbnail(img)
						embed.setColor('LIGHT_GREY')
						embed.addField("HP", hp, true)
						embed.addField("ATK", atk, true)
						embed.addField("DEF", def, true)
						embed.addField("Range", ran, true)
						embed.addField("MR", lv1v1[14], true)
						embed.addField("Block", lv1v1[16], true)
						embed.addField("Cost", lv1v1[20], true)
						let aw2 = awna + "Skill"
						console.log("Skill")
						if ($('.' + aw2 + ' table:nth-child(3) tr:nth-child(2) td:nth-child(2)').first().html() != null) {
							console.log(aw2);
							console.log($('.' + aw2 + ' table tr:nth-child(2) td a').first().html())
							let sna = na($('.' + aw2 + ' table tr:nth-child(2)').first().html())
							let sdes = na($('.' + aw2 + ' table tr:nth-child(3)').first().html())
							let scd = na($('.' + aw2 + ' table:nth-child(3) tr:nth-child(2) td:nth-child(2)').first().html())
							embed.addField("Skill: " + sna, sdes + "\n**Cooldown:** " + scd)

						}
						else {
							let siz = $('.' + aw2).find('tr').length;
							for (var i = 1; i < siz; i++) {
								output = $('.' + aw2).find('tr').eq(i).text();
								let aa = te(output);
								if (i == 1) {
									embed.addField("Skill: " + aa[1], aa[2] + "\n**Cooldown:** " + aa[3])
								}
								else {
									embed.addField("Skill: " + aa[0], aa[1] + "\n**Cooldown:** " + aa[2])
								}
							}
						}
						console.log("Ability")
						let aw3 = awna + "Ability"
						output = $('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(14)').first().html();
						let ana = na(output);
						let ades = te2($('.' + aw3 + ' table tbody tr:nth-child(3) td:nth-child(2)').text())
						let anote = $('.' + aw3 + ' table tbody tr:nth-child(3) td:nth-child(4)').text().trim();
						if (anote) {
							embed.addField("Ability: " + ana, ades + "\n**Notes:** \n" + anote)
						}
						else {
							embed.addField("Ability: " + ana, ades)
						}
						console.log("Trait")
						let cna;
						if (ele == "Sacred Gear") { cna = "Sacred" }
						else { cna = "Prince (" + ele + ")" }
						let ind = $(".gcstyle.bgwhite.hsbullet tr:contains('" + cna + "'):not(:contains('Junior')):not(:contains('Lesser'))").index() + 1
						let des2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2)').html()
						let note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(3)').html()
						let ind2 = ind - 1;
						if ($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind2 + ') td:nth-child(3)').attr('rowspan') == 2) {
							note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind2 + ') td:nth-child(3)').html()
						}
						if (!des2) {
							des2 = des
						}
						else if (affe(des2) == undefined) { des2 = des }
						if (!note2) {
							embed.addField("Class Traits", affe(des2));
						}
						else {
							if (affe(note2) != undefined) {
								embed.addField("Class Traits", affe(des2) + "\n**Notes:** \n" + affe(note2));
							}
							else { embed.addField("Class Traits", affe(des2)); }
						}
						pages.push(embed)
					})
					functions.sende(message, pages)
				}
				else {
					let ele = unit
					console.log(ele)
					var awlist = awl($('.unit-infobox.hidden').first().html())
					var embed
					if (awlist.includes(ele)) {
						let awna;
						if (ele == "Sacred Gear") { awna = "SacredEquipment" }
						else (awna = ele.split(' ').join(''))
						let aw1 = awna + "MStatBox"
						let hp;
						let atk;
						let def;
						let ran
						output = $('.' + aw1 + ' table tbody tr:nth-child(3)').first().text();
						let lv1v1 = lv1line(output);
						output = $('.' + aw1 + ' table tbody tr:nth-child(8)').first().text();
						if (output) {
							let lv99v1 = lv1line(output);
							hp = lv99v1[2]
							atk = lv99v1[4]
							def = lv99v1[6]
							output = $('.' + aw1 + ' table tbody tr:nth-child(6) td:nth-child(5)').first().html();
							ran = range(output);
						}
						else {
							hp = lv1v1[8]
							atk = lv1v1[10]
							def = lv1v1[12]
							output = $('.' + aw1 + ' table tbody tr:nth-child(4)').first().html();
							ran = range(output);
						}
						img = ($('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
						output = $('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(3)').first().html();
						let nam = na(output);
						embed = new Discord.MessageEmbed()
						embed.setTitle(nam)
						embed.setURL(link)
						embed.setThumbnail(img)
						embed.setColor('LIGHT_GREY')
						embed.addField("HP", hp, true)
						embed.addField("ATK", atk, true)
						embed.addField("DEF", def, true)
						embed.addField("Range", ran, true)
						embed.addField("MR", lv1v1[14], true)
						embed.addField("Block", lv1v1[16], true)
						embed.addField("Cost", lv1v1[20], true)
						let aw2 = awna + "Skill"
						if ($('.' + aw2 + ' table:nth-child(3) tr:nth-child(2) td:nth-child(2)').first().html() != null) {
							console.log($('.' + aw2 + ' table tr:nth-child(2) td a').first().html())
							let sna = na($('.' + aw2 + ' table tr:nth-child(2)').first().html())
							let sdes = na($('.' + aw2 + ' table tr:nth-child(3)').first().html())
							let scd = na($('.' + aw2 + ' table:nth-child(3) tr:nth-child(2) td:nth-child(2)').first().html())
							embed.addField("Skill: " + sna, sdes + "\n**Cooldown:** " + scd)

						}
						else {
							let siz = $('.' + aw2).find('tr').length;
							for (var i = 1; i < siz; i++) {
								output = $('.' + aw2).find('tr').eq(i).text();
								let aa = te(output);
								if (i == 1) {
									embed.addField("Skill: " + aa[1], aa[2] + "\n**Cooldown:** " + aa[3])
								}
								else {
									embed.addField("Skill: " + aa[0], aa[1] + "\n**Cooldown:** " + aa[2])
								}
							}
						}
						let aw3 = awna + "Ability"
						output = $('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(14)').first().html();
						let ana = na(output);
						let ades = te2($('.' + aw3 + ' table tbody tr:nth-child(3) td:nth-child(2)').text())
						let anote = $('.' + aw3 + ' table tbody tr:nth-child(3) td:nth-child(4)').text().trim();
						if (anote) {
							embed.addField("Ability: " + ana, ades + "\n**Notes:** \n" + anote)
						}
						else {
							embed.addField("Ability: " + ana, ades)
						}
						let cna;
						if (ele == "Sacred Gear") { cna = "Sacred" }
						else { cna = "Prince (" + ele + ")" }
						let ind = $(".gcstyle.bgwhite.hsbullet tr:contains('" + cna + "'):not(:contains('Junior')):not(:contains('Lesser'))").index() + 1
						let des2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2)').html()
						let note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(3)').html()
						let ind2 = ind - 1;
						if ($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind2 + ') td:nth-child(3)').attr('rowspan') == 2) {
							note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind2 + ') td:nth-child(3)').html()
						}
						if (!des2) {
							des2 = des
						}
						else if (affe(des2) == undefined) { des2 = des }
						if (!note2) {
							embed.addField("Class Traits", affe(des2));
						}
						else {
							if (affe(note2) != undefined) {
								embed.addField("Class Traits", affe(des2) + "\n**Notes:** \n" + affe(note2));
							}
							else { embed.addField("Class Traits", affe(des2)); }
						}
						message.channel.send(embed)
					}
					else { message.channel.send("No Data") }
				}
			}
		})
	}
}

function awl(output) {
	if (output != null) {
		output = output.replace(/<[^>]*>/g, "\n");
		output = output.replace(/\n+ /g, "\n");
	}
	else { return; }
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
	var artist = false;
	var title = false;
	var filtered = arr.filter(function (el) {
		if (el == "Measurements:") { artist = true }
		if (el == "Artist:") { artist = true }
		if (el == "Base") { title = true }
		if (artist) { return false }
		if (!title) { return false }
		return el != null && el != '' && el != "·" && el != " " && el != "Ouji" && el != "王子" && el != "Prince" && el != "Base" && el.length >= 2;
	});
	var filtered2 = []
	for (var i = 0; i < filtered.length / 2; i++) {
		filtered2.push(filtered[2 * i])
	}
	return filtered2;
}
function lv1line(output) {
	if (output != null) {
		output = output.replace(/<[^>]*>/g, "\n");
		output = output.replace(/\n+ /g, "\n");
	}
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');

	return arr;
}
function range(output) {
	if (output != null) {
		output = output.replace(/<[^>]*>/g, "\n");
		output = output.replace(/\n+ /g, "\n");
	}
	else { return; }
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
		return el != null && el != '';
	});
	var range = filtered[0];
	let i = 1;
	while (i < filtered.length) {
		range = range + "/" + filtered[i];
		i++;
	}
	return range;
}
function affe(output) {
	if (output != null) {
		output = striptags(output, '<br>')
		output = output.replace(/<[^>]*>/g, "\n");
		output = output.replace(/\n+ /g, "\n");
	}
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
		return el != null && el != '';
	});
	var na = filtered[0];
	let i = 1;
	while (i < filtered.length) {
		na = na + "\n" + filtered[i];
		i++;
	}
	return na;
}
function na(output) {
	if (output != null) {
		output = output.replace(/<[^>]*>/g, "\n");
		output = output.replace(/\n+ /g, "\n");
	}
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
function te2(output) {
	if (output != null) {
		output = output.replace(/<[^>]*>/g, "\n");
		output = output.replace(/\n+ /g, "\n");
	}
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
		return el != null && el != '' && el.substring(0, 12) != "This ability";
	});
	return filtered.join("\n");
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
module.exports = FindPrince;
