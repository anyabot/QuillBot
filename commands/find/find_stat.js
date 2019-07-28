const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var name = require('../../library/lib.js').name;
var suffix = require('../../library/suf.js').suffix;
require('@gouch/to-title-case')
var urlencode = require('urlencode');

var bonus = {
	"PEV": "Physical Attack Evasion",
	"PAD": "Post-Attack Deplay",
	"SCD": "Skill Cooldown",
	"SDI" :"Skill Duration"
}


class FindStat extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stat',
		aliases: ['stats'],
            group: 'find',
            memberName: 'stat',
            description: 'find stats of an unit',
		examples: ['~stat quill'],
        });
    }

    async run(message, input) {
        var unit = input.toLowerCase().toTitleCase();
	    var np = unit.split(' ');
	    var npl = np.length;
	    if (npl >= 2) {
	    	if (suffix[np[npl-1]]) {np[npl-1] = suffix[np[npl-1]]}
	    	if (np[npl-1] == 'Year' && np[npl-2] == 'New') {
			np[npl-1] = 'Year\'s)';
			np[npl-2] = '(New';
		}
		    if (np[npl-1] == 'Year)' && np[npl-2] == '(New') {
			np[npl-1] = 'Year\'s)';
			np[npl-2] = '(New';
		}
	    }
	    unit = np.join(' ')
        if (name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + urlencode(unit);
        request(link, function (err, resp, html) {
            if (!err) {
		    
                const $ = cheerio.load(html);
		var output;
                var img;
		var aff;
		var check = false;
		var pages = []
		var page = 1;
		output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
                if(output) {
			check = true;
                	let lv1v1 = lv1line(output);
                	output = $('.listtable.bgwhite tr:nth-child(4)').first().text();
                	let lv99v1 = lv1line(output);
			output = $('.listtable.bgwhite tr:nth-child(4) td:nth-child(5)').first().html();
			let ran = range(output);
			output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(12)').first().html();
			aff = affe(output);
			img = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
			output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
			let nam = na(output);
			let embed = new Discord.RichEmbed()
			.setTitle(nam + " (" + lv1v1[4] + " → " + lv99v1[0] + ")")
			.setThumbnail(img)
			.setColor('LIGHT_GREY')
			.addField("HP", lv1v1[5] + " → " + lv99v1[1], true)
			.addField("ATK", lv1v1[6] + " → " + lv99v1[2], true)
			.addField("DEF", lv1v1[7] + " → " + lv99v1[3], true)
			.addField("Range", ran, true)
			.addField("MR", lv1v1[8], true)
			.addField("Block", lv1v1[9], true)
			.addField("Max Cost", lv1v1[10], true)
			.addField("Min Cost", lv1v1[11], true)
			.addField("Affection Bonus", aff, true)
			pages.push(embed);
		}
		if ($('.c2').find('td').length >= 6) {
			output = $('.c2.numbers').first().text();
			if(output) {
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
				.setTitle(nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
				.setThumbnail(img)
				.setColor('RED')
				.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
				.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
				.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
				.addField("Range", ran, true)
				.addField("MR", lv1v1[5], true)
				.addField("Block", lv1v1[6], true)
				.addField("Max Cost", lv1v1[7], true)
				.addField("Min Cost", lv1v1[8], true)
				.addField("Affection Bonus", aff, true)
				pages.push(embed);
			}
		}
		output = $('.c3.numbers').first().text();
		if(output) {
                	let lv99v1 = lv1line(output);
                	output = $('.c3 ').first().text();
                	let lv1v1 = lv1line(output);
			output = $('.c3.numbers td:nth-child(5)').first().html();
			let ran = range(output);
			output = $('.c3 td:nth-child(11)').first().html();
			aff = affe(output);
			img = ($('.c3 td:first-child div a img').attr('data-src'));
			output = $('.c3 td:nth-child(2)').first().html();
			let nam = na(output);
			let embed = new Discord.RichEmbed()
			.setTitle(nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
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
                output = $('.c4.numbers').first().text();
		if(output) {
                	let lv99v1 = lv1line(output);
                	output = $('.c4 ').first().text();
                	let lv1v1 = lv1line(output);
			output = $('.c4.numbers td:nth-child(5)').first().html();
			let ran = range(output);
			let nam;
			if ($('.c4 td:nth-child(3)').hasClass('leftal')) {
				img = ($('.c4 td:first-child div a img').attr('data-src'));
				output = $('.c4 td:nth-child(2)').first().html();
				nam = na(output);
			}
			if (!$('.c4 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c4 td:nth-child(1)').first().html();
				nam = na(output);
			}
			let embed = new Discord.RichEmbed()
			.setTitle(nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
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
		output = $('.c5.numbers').first().text();
		if(output) {
                	let lv99v1 = lv1line(output);
                	output = $('.c5 ').first().text();
                	let lv1v1 = lv1line(output);
			output = $('.c5.numbers td:nth-child(5)').first().html();
			let ran = range(output);
			let nam;
			if ($('.c5 td:nth-child(3)').hasClass('leftal')) {
				img = ($('.c5 td:first-child div a img').attr('data-src'));
				output = $('.c5 td:nth-child(2)').first().html();
				nam = na(output);
			}
			if (!$('.c5 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c5 td:nth-child(1)').first().html();
				nam = na(output);
			}
			let embed = new Discord.RichEmbed()
			.setTitle(nam + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
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
		var embed = pages[0];
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
                if (!check) {message.channel.send("No Data")};
            }
        });
    }
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
module.exports = FindStat;
