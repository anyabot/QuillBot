const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
require('@gouch/to-title-case')
var urlencode = require('urlencode');

class FindPrince extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'prince',
		aliases: ['p'],
            	group: 'find',
            	memberName: 'prince',
            	description: 'find data of AW prince',
		examples: ['~prince'],
        });
    }

    async run(message, input) {
		var link = "https://aigis.fandom.com/wiki/Prince";
		request(link, function (err, resp, html) {
			if (!err) {
				const $ = cheerio.load(html);
				var output;
				var img;
				var awlist = awl($('.unit-infobox.hidden').first().html())
				var page = 1;
				var pages = []
				var embed
				awlist.forEach(function(ele) {
					console.log(ele)
					let awna;
					if (ele == "Sacred Gear") {awna = "SacredEquipment"}
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
						hp = lv99v1[1]
						atk = lv99v1[2]
						def = lv99v1[3]
						output = $('.' + aw1 + ' table tbody tr:nth-child(6) td:nth-child(5)').first().html();
						ran = range(output);
					}
					else {
						hp = lv1v1[5]
						atk = lv1v1[6]
						def = lv1v1[7]
						output = $('.' + aw1 + ' table tbody tr:nth-child(4)').first().html();
						ran = range(output);
					}
					img = ($('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
					output = $('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(3)').first().html();
					let nam = na(output);
					embed = new Discord.RichEmbed()
					embed.setTitle(nam)
					embed.setThumbnail(img)
					embed.setColor('LIGHT_GREY')
					embed.addField("HP", hp, true)
					embed.addField("ATK", atk, true)
					embed.addField("DEF", def, true)
					embed.addField("Range", ran, true)
					embed.addField("MR", lv1v1[8], true)
					embed.addField("Block", lv1v1[9], true)
					embed.addField("Cost", lv1v1[11], true)
					let aw2 = awna + "Skill"
					let sna = na($('.' + aw2 + ' table tr:nth-child(2)').first().html())
					let sdes = na($('.' + aw2 + ' table tr:nth-child(3)').first().html())
					let scd = na($('.' + aw2 + ' table:nth-child(3) tr:nth-child(2) td:nth-child(2)').first().html())
					embed.addField("Skill: " + sna, sdes + "\n**Cooldown:** " + scd)
					let aw3 = awna + "Ability"
					output = $('.' + aw1 + ' table tbody tr:nth-child(3) td:nth-child(14)').first().html();
					let ana = na(output);
						let ades = te2($('.' + aw3 + ' table tbody tr:nth-child(3) td:nth-child(2)').text())
					let anote = $('.' + aw3 + ' table tbody tr:nth-child(3) td:nth-child(4)').text().trim();
					console.log(ana)
					console.log(ades)
					if (anote) {
						embed.addField("Ability: " + ana, ades + "\n**Notes:** \n" + anote)
					}
					else {
						embed.addField("Ability: " + ana, ades)
					}
					pages.push(embed)
				})
				embed = pages[0];
				embed.setFooter('Page ' + page + ' of ' + pages.length);
				message.channel.send(embed).then(msg => {

					msg.react('⬅').then( r => {
						msg.react('➡')

						// Filters
						const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && !user.bot;
						const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && !user.bot;

						const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
						const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});

						backwards.on('collect', r => {
						r.remove(r.users.filter(u => !u.bot).first());
							if (page === 1) return;
							page--;
								embed = pages[page-1];
								embed.setFooter('Page ' + page + ' of ' + pages.length);
								msg.edit(embed)
						})

						forwards.on('collect', r => {
						r.remove(r.users.filter(u => !u.bot).first());
								if (page === pages.length) return;
								page++;
								embed = pages[page-1];
								embed.setFooter('Page ' + page + ' of ' + pages.length);
								msg.edit(embed)
						})
					})
				})
			}
		})
    }
}

function awl(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
  var artist = false;
	var filtered = arr.filter(function (el) {
    if (el == "Artist:") {artist = true}
    if (artist) {return false}
  	return el != null && el != '' && el!= "·" && el!= " " && el!= "Ouji" && el!= "王子" &&  el!= "Prince" && el != "Base" && el.length >= 2;
	});
  var filtered2 = []
  for (var i = 0; i < filtered.length/2; i++) {
    filtered2.push(filtered[2*i])
  }
    return filtered2;
}
function lv1line(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	output = he.decode(output);
    output = output.trim();
    var arr = output.split('\n');

   return arr;
}
function range(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
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
	
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	output = he.decode(output);
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
  	return el != null && el != '';
	});
	var affe = filtered[0];
  let i = 1;
	while (i < filtered.length) {
		if (bonus[filtered[i]]) {
			affe = affe + "\n" + bonus[filtered[i]] + filtered[i+1];
			i = i +2;
		}
		else if (!isNaN(filtered[i])) {
			affe = affe + filtered[i]
			i++;
		}
		else {
			affe = affe + "\n" + filtered[i]
			i++;
		}
	}
    return affe;
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
function te2(output) {
  output = output.replace(/<[^>]*>/g, "\n");
  output = output.replace(/\n+ /g, "\n");
  output = he.decode(output);
  output = output.trim();
  var arr = output.split('\n');
  var filtered = arr.filter(function(el) {
    return el != null && el != '' && el.substring(0,12) != "This ability";
  });
  return filtered.join("\n");
}
module.exports = FindPrince;