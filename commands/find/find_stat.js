const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var name = require('../../library/lib.js').name;
var suffix = require('../../library/suf.js').suffix;
require('@gouch/to-title-case')
var urlencode = require('urlencode');
var functions = require('../../functions.js');

var bonus = {
	"PEV": "Physical Attack Evasion",
	"PAD": "Post-Attack Delay",
	"SCD": "Skill Cooldown",
	"SDI" : "Skill Duration",
	"PRC" : "Piercing Attack"
}


class FindStat extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stat',
		aliases: ['stats', 'aff', 'affection'],
            group: 'find',
            memberName: 'stat',
            description: 'find stats of an unit',
		examples: ['&stat quill'],
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
		    var pu = $('.categories').text().includes("Player Units");
		    var chibi = $('.categories').text().includes("Chibi Units");
		    if (pu) {
			var output;
			var img;
			var aff;
			var check = false;
			var pages = []
			var page = 1;
			output = $('.listtable.bgwhite tbody tr:nth-child(3)').first().text();
			if(output) {
				check = true;
				let lv1v1 = lv1line(output);
				console.log(lv1v1)
				output = $('.listtable.bgwhite tbody tr:nth-child(4)').first().text();
				let lv99v1 = lv1line(output);
				console.log(lv99v1)
				output = $('.listtable.bgwhite tbody tr:nth-child(4) td:nth-child(5)').first().html();
				let ran = range(output);
				console.log(ran)
				output = $('.listtable.bgwhite tbody tr:nth-child(3) td:nth-child(12)').first().html();
				aff = affe(output);
				console.log(aff)
				img = ($('.listtable.bgwhite tbody tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
				if (!img) {img = ($('.listtable.bgwhite tbody tr:nth-child(3) td:nth-child(2)  div a img').attr('src'));}
				console.log(img)
				output = $('.listtable.bgwhite tbody tr:nth-child(3) td:nth-child(3)').first().html();
				let nam = na(output);
				console.log(nam)
				let embed = new Discord.RichEmbed()
				.setURL(link)
				.setTitle(unit)
				.addField("Class", nam + " (" + lv1v1[3] + " → " + lv99v1[0] + ")")
				.setThumbnail(img)
				.setColor('LIGHT_GREY')
				.addField("HP", lv1v1[4] + " → " + lv99v1[1], true)
				.addField("ATK", lv1v1[5] + " → " + lv99v1[2], true)
				.addField("DEF", lv1v1[6] + " → " + lv99v1[3], true)
				.addField("Range", ran, true)
				.addField("MR", lv1v1[7], true)
				.addField("Block", lv1v1[8], true)
				.addField("Max Cost", lv1v1[9], true)
				.addField("Min Cost", lv1v1[10], true)
				.addField("Affection Bonus", aff, true)
				pages.push(embed);
			}
			if (($('.c2').find('td').length >= 6) && !chibi) {
				output = $('.c2.numbers').first().text();
				if(output && $('.c2.numbers').find('td') >=5) {
					let lv99v1 = lv1line(output);
					output = $('.c2 ').first().text();
					let lv1v1 = lv1line(output);
					output = $('.c2.numbers td:nth-child(5)').first().html();
					let ran = range(output);
					output = $('.c2 td:nth-child(10)').first().html();
					aff = affe(output);
					output = $('.c2 td:nth-child(1)').first().html();
					let nam = na(output);
					let embed = new Discord.RichEmbed()
					.setURL(link)
					.setTitle(unit)
					.addField("Class", nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
					.setThumbnail(img)
					.setColor('RED')
					.addField("HP", lv1v1[2] + " → " + lv99v1[2], true)
					.addField("ATK", lv1v1[3] + " → " + lv99v1[4], true)
					.addField("DEF", lv1v1[4] + " → " + lv99v1[6], true)
					.addField("Range", ran, true)
					.addField("MR", lv1v1[5], true)
					.addField("Block", lv1v1[6], true)
					.addField("Max Cost", lv1v1[7], true)
					.addField("Min Cost", lv1v1[8], true)
					.addField("Affection Bonus", aff, true)
					pages.push(embed);
				}
			}
			output = $('tbody tr.c3.numbers').text();
			if(output) {
				let lv99v1 = lv1line(output);
				output = $('.c3 ').first().text();
				let lv1v1 = lv1line(output);
				console.log(lv1v1)
				output = $('.c3.numbers td:nth-child(5)').first().html();
				let ran = range(output);
				let nam;
				if ($('.c3 td:nth-child(3)').hasClass('leftal')) {
					img = ($('.c3 td:first-child div a img').attr('data-src'));
					if (!img) {img = ($('.c3 td:first-child div a img').attr('src'));}
					output = $('.c3 td:nth-child(2)').first().html();
					nam = na(output);
					output = $('.c3 td:nth-child(11)').first().html();
					aff = affe(output);
				}
				if (!$('.c3 td:nth-child(3)').hasClass('leftal')) {
					output = $('.c3 td:nth-child(1)').first().html();
					nam = na(output);
					output = $('.c3 td:nth-child(10)').first().html();
					aff = affe(output);
				}
				let embed = new Discord.RichEmbed()
				.setURL(link)
				.setTitle(unit)
				.addField("Class", nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
				.setThumbnail(img)
				.setColor('BLUE')
				.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
				.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
				.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
				.addField("Range", ran, true)
				.addField("MR", lv1v1[5], true)
				.addField("Block", lv1v1[6], true)
				.addField("Max Cost", lv1v1[7], true)
				.addField("Min Cost", lv1v1[8], true)
				.addField("Affection Bonus", aff, true)
				pages.push(embed)
			}
			output = $('tbody tr.c4.numbers').text();
			if(output) {
				let lv99v1 = lv1line(output);
				output = $('.c4 ').first().text();
				let lv1v1 = lv1line(output);
				console.log(lv1v1)
				output = $('.c4.numbers td:nth-child(5)').first().html();
				let ran = range(output);
				let nam;
				if ($('.c4 td:nth-child(3)').hasClass('leftal')) {
					img = ($('.c4 td:first-child div a img').attr('data-src'));
					if (!img) {img = ($('.c4 td:first-child div a img').attr('src'));}
					output = $('.c4 td:nth-child(2)').first().html();
					nam = na(output);
				}
				if (!$('.c4 td:nth-child(3)').hasClass('leftal')) {
					output = $('.c4 td:nth-child(1)').first().html();
					nam = na(output);
				}
				let embed = new Discord.RichEmbed()
				.setURL(link)
				.setTitle(unit)
				.addField("Class", nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
				.setThumbnail(img)
				.setColor('DARK_PURPLE')
				.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
				.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
				.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
				.addField("Range", ran, true)
				.addField("MR", lv1v1[5], true)
				.addField("Block", lv1v1[6], true)
				.addField("Max Cost", lv1v1[7], true)
				.addField("Min Cost", lv1v1[8], true)
				.addField("Affection Bonus", aff, true)
				pages.push(embed)
			}
			output = $('tbody tr.c5.numbers').text();
			if(output) {
				let lv99v1 = lv1line(output);
				output = $('.c5 ').first().text();
				let lv1v1 = lv1line(output);
				console.log(lv1v1)
				output = $('.c5.numbers td:nth-child(5)').first().html();
				let ran = range(output);
				let nam;
				if ($('.c5 td:nth-child(3)').hasClass('leftal')) {
					img = ($('.c5 td:first-child div a img').attr('data-src'));
					if (!img) {img = ($('.c5 td:first-child div a img').attr('src'));}
					output = $('.c5 td:nth-child(2)').first().html();
					nam = na(output);
				}
				if (!$('.c5 td:nth-child(3)').hasClass('leftal')) {
					output = $('.c5 td:nth-child(1)').first().html();
					nam = na(output);
				}
				let embed = new Discord.RichEmbed()
				.setURL(link)
				.setTitle(unit)
				.addField("Class", nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
				.setThumbnail(img)
				.setColor('DARK_PURPLE')
				.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
				.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
				.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
				.addField("Range", ran, true)
				.addField("MR", lv1v1[5], true)
				.addField("Block", lv1v1[6], true)
				.addField("Max Cost", lv1v1[7], true)
				.addField("Min Cost", lv1v1[8], true)
				.addField("Affection Bonus", aff, true)
				pages.push(embed)
			}
			if (check) {
			functions.sende(message, pages)
		    }
			if (!check) {message.channel.send("No Data")};
		    }
		    else {message.channel.send("No Data")}
            }
        });
    }
}

function lv1line(output) {
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
   return filtered;
}
function range(output) {
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
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	}
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
    if (output != null) {
    		output = output.replace(/<[^>]*>/g, "\n");
    		output = output.replace(/\n+ /g, "\n");
	}
	else {return null}
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
module.exports = FindStat;
