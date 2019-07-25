const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
require('@gouch/to-title-case')

class UtilFarm extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'farm',
            group: 'util',
            memberName: 'farm',
            description: 'find daily revival maps to get silver units'
        });
    }

    async run(message, input) {
        var cname = input.toLowerCase().toTitleCase();
        var link = "https://aigis.fandom.com/wiki/Daily_Revivals"

request(link, function(err, resp, html) {
	if (!err) {
		var pages = [];
		var page = 1;
		const $ = cheerio.load(html);
		$('.mw-collapsible.mw-collapsed.wikitable').each(function(i, elem) {
			let aaa = na($(elem).find('tr').find('th').first().text())
			if (aaa == cname) {
				console.log(aaa)
				let len = $(elem).find('tr').length
				var embed = new Discord.RichEmbed()
				embed.setColor('RANDOM')
				for (var j = 2; j < len; j++) {
					
					let uname = na($(elem).find('tr').eq(j).children().eq(0).find('a').attr('title'))
					let ename = na($(elem).find('tr').eq(j).children().eq(1).text())
					let cha = na($(elem).find('tr').eq(j).children().eq(3).text())
					let sta = na($(elem).find('tr').eq(j).children().eq(4).text())
					let sname = na($(elem).find('tr').eq(j).children().eq(5).find('a').attr('title'))
					if (j%12 == 1) {
						message.channel.send(embed)
						embed = new Discord.RichEmbed()
						embed.setColor('RANDOM')
						embed.addField(j + "/ " + ename + " [" + uname +"]", "**Map: **" + cha + "/" + sta + "\t **Silver Unit: **" + sname)
					}
					else {embed.addField(j + "/ " + ename + " [" + uname +"]", "**Map: **" + cha + "/" + sta + "\t **Silver Unit: **" + sname)}
				}
				message.channel.send(embed)
			}
		})
	}
})
	}
}
function na(output) {
  output = output.replace(/<[^>]*>/g, "\n");
  output = output.replace(/\n+ /g, "\n");
  output = he.decode(output);
  output = output.trim();
  var arr = output.split('\n');
  var filtered = arr.filter(function(el) {
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
module.exports = UtilFarm;
