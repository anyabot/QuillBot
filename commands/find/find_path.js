const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var name = require('../../library/lib.js').name;
require('@gouch/to-title-case')
var urlencode = require('urlencode');

class FindPath extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'path',
		aliases: ['paths'],
            group: 'find',
            memberName: 'path',
            description: 'find all classes of an unit',
		examples: ['~path quill'],
        });
    }

    async run(message, input) {
        var unit = input.toLowerCase().toTitleCase();
        if (name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + urlencode(unit);
        request(link, function (err, resp, html) {
            if (!err) {
		    
                const $ = cheerio.load(html);
		var output;
                var img;
		var aff;
    var note = $('.gcstyle.bgwhite.hsbullet tr:nth-child(2) td:nth-child(3)').text();
    var des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(2) td:nth-child(2)').html());
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
			.setTitle(nam)
			.setThumbnail(img)
			.setColor('LIGHT_GREY')
      let ind = $(".gcstyle.bgwhite.hsbullet tr:contains('"+ nam + "'):not(:contains('Junior')):not(:contains('Lesser'))").index() + 1
      let len = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ')').find('td').length
      let des2
      let note2
      if (len == 3) {
        des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind +') td:nth-child(2)').html())
        note = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(3)').html())
      }
      if (len == 2) {
        note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2) ul').text()
        if (note2) {note = note2.trim()}
        else {
          des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2)').html())
        }
      }
      embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
			pages.push(embed);
		}
		if ($('.listtable.bgwhite tr').length >= 5) {
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
				.setTitle(nam)
				.setThumbnail(img)
				.setColor('RED')
	let ind = $(".gcstyle.bgwhite.hsbullet tr:contains('"+ nam + "'):not(:contains('Junior')):not(:contains('Lesser'))").index() + 1
      let len = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ')').find('td').length
      let des2
      let note2
      if (len == 3) {
        des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind +') td:nth-child(2)').html())
        note = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(3)').html())
      }
      if (len == 2) {
        note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2) ul').text()
        if (note2) {note = note2.trim()}
        else {
          des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2)').html())
        }
      }
      embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
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
			.setTitle(nam)
			.setThumbnail(img)
			.setColor('BLUE')
	let ind = $(".gcstyle.bgwhite.hsbullet tr:contains('"+ nam + "'):not(:contains('Junior')):not(:contains('Lesser'))").index() + 1
      let len = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ')').find('td').length
      let des2
      let note2
      if (len == 3) {
        des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind +') td:nth-child(2)').html())
        note = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(3)').html())
      }
      if (len == 2) {
        note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2) ul').text()
        if (note2) {note = note2.trim()}
        else {
          des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2)').html())
        }
      }
      embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
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
			.setTitle(nam)
			.setThumbnail(img)
			.setColor('DARK_PURPLE')
	let ind = $(".gcstyle.bgwhite.hsbullet tr:contains('"+ nam + "'):not(:contains('Junior')):not(:contains('Lesser'))").index() + 1
      let len = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ')').find('td').length
      let des2
      let note2
      if (len == 3) {
        des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind +') td:nth-child(2)').html())
        note = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(3)').html())
      }
      if (len == 2) {
        note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2) ul').text()
        if (note2) {note = note2.trim()}
        else {
          des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2)').html())
        }
      }
      embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
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
			.setTitle(nam)
			.setThumbnail(img)
			.setColor('DARK_PURPLE')
	let ind = $(".gcstyle.bgwhite.hsbullet tr:contains('"+ nam + "'):not(:contains('Junior')):not(:contains('Lesser'))").index() + 1
      let len = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ')').find('td').length
      let des2
      let note2
      if (len == 3) {
        des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind +') td:nth-child(2)').html())
        note = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(3)').html())
      }
      if (len == 2) {
        note2 = $('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2) ul').text()
        if (note2) {note = note2.trim()}
        else {
          des = affe($('.gcstyle.bgwhite.hsbullet tr:nth-child(' + ind + ') td:nth-child(2)').html())
        }
      }
      embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
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
	var na = filtered[0];
	let i = 1;
	while (i < filtered.length) {
		na = na + "\n" + filtered[i];
		i++;
	}
    return na;
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
module.exports = FindPath;
