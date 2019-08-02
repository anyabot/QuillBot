const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var printf = require('printf');
require('@gouch/to-title-case')
var pluralize = require('pluralize')

class UtilFarm extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'farm',
		aliases: ['f'],
            group: 'util2',
            memberName: 'farm',
            description: 'find daily revival maps to get silver units',
		examples: ['&farm soldier'],
        });
    }

    async run(message, input) {
        var cname = input.toLowerCase().toTitleCase();
	if (cname == "Dragon Soldier") {cname = "Intermediate Dragon Soldier"}
	if (cname == "Priestess Warrior") {cname = "Priest Warrior"}
	    if (cname == "Priestess Warriors") {cname = "Priest Warrior"}
        var link = "https://aigis.fandom.com/wiki/Daily_Revivals"

request(link, function(err, resp, html) {
	if (!err) {
		var check = false;
		var pages = [];
		var page = 1;
		const $ = cheerio.load(html);
		$('.mw-collapsible.mw-collapsed.wikitable').each(function(i, elem) {
			let aaa = na($(elem).find('tr').find('th').first().text())
			if (aaa == cname || aaa == pluralize.singular(cname)) {
				check = true;
				let len = $(elem).find('tr').length
				var embed = "```"
				for (var j = 2; j < len; j++) {
					
					let uname = na($(elem).find('tr').eq(j).children().eq(0).find('a').attr('title'))
					let ename = na($(elem).find('tr').eq(j).children().eq(1).text())
					let cha = na($(elem).find('tr').eq(j).children().eq(3).text())
					let sta = na($(elem).find('tr').eq(j).children().eq(4).text())
					let sname = na($(elem).find('tr').eq(j).children().eq(5).find('a').attr('title'))
					let sname2 = $(elem).find('tr').eq(j).children().eq(6).find('a').attr('title')
					if (j%8 == 2 && j != 2) {
						pages.push(embed)
						embed = "```"
						if (sname2) {
							let line = printf("%s\nEvent Unit: %-20sMap: %3d/%-2d        Silver Unit: %-18sSilver Unit 2: %s\n", ename, uname, cha, sta, sname, na(sname2))
							embed = embed + line + "----------\n"
						}
						else {
							let line = printf("%s\nEvent Unit: %-20sMap: %3d/%-2d        Silver Unit: %-18s\n", ename, uname, cha, sta, sname)
							embed = embed + line + "----------\n"
						}
					}
					else {
						if (sname2) {
							let line = printf("%s\nEvent Unit: %-20sMap: %3d/%-2d        Silver Unit: %-18sSilver Unit 2: %s\n", ename, uname, cha, sta, sname, na(sname2))
							embed = embed + line + "----------\n"
						}
						else {
							let line = printf("%s\nEvent Unit: %-20sMap: %3d/%-2d        Silver Unit: %-18s\n", ename, uname, cha, sta, sname)
							embed = embed + line + "----------\n"
						}
					}
				}
				pages.push(embed)
				embed = pages[page-1]
				embed = embed + 'Page ' + page + ' of ' + pages.length + '```';
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
							embed = embed + 'Page ' + page + ' of ' + pages.length + '```';
							msg.edit(embed)
						})

						forwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
							if (page === pages.length) return;
							page++;
							embed = pages[page-1];
							embed = embed + 'Page ' + page + ' of ' + pages.length + '```';
							msg.edit(embed)
						})
					})
				})
			}
		})
		if (!check) {message.channel.send("No Data")}
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
