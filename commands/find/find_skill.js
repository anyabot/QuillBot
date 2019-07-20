const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');


class FindSkill extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'skill',
            group: 'find',
            memberName: 'skill',
            description: 'find skill and saw of an unit'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        if (name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
		    
                const $ = cheerio.load(html);
				var check = false;
				var pages = [];
				var page = 1;
		    		var img;
				var output;
		    		var aw = false
				var embed1 = new Discord.RichEmbed()
				var embed2 = new Discord.RichEmbed()
				$('.wikitable').each(function(i, elem) {
					output = $(elem).first().text();
					let ar = te(output);
					if (ar[0].trim() === 'Unit'){
						check = true;
						let siz = $(elem).find('tr').length;
						img = $(elem).find('tr').eq(1).find('td').find('div').find('a').attr('href');
						let out = $(elem).find('tr').eq(1).html();
						let aa = te(out);
						embed1.setTitle("Normal Skill")
						embed1.setThumbnail(img)
						embed1.addField(aa[2], aa[3] + "\n**CD: **" +aa[4] + "\n**Initial: **" + aa[5]);
						for (var i = 2; i < siz; i++){
							output = $(elem).find('tr').eq(i).html();
							let aa = te(output);
							if (aa[0] === "Awakened") {
								aw = true;
								pages.push(embed1)
								embed2.addField(aa[1], aa[2] + "\n**CD: **" +aa[3] + "\n**Initial: **" + aa[4]);
							}
							else if (!aw) {
								embed1.addField(aa[0], aa[1] + "\n**CD: **" +aa[2] + "\n**Initial: **" + aa[3]);
							}
							else {
								embed2.addField(aa[0], aa[1] + "\n**CD: **" +aa[2] + "\n**Initial: **" + aa[3]);
							}
							
						}
						
					}
				})
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

function te(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
    output = output.trim();
    var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
  	return el != null && el != '';
	});
   return filtered;
}
function range(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
  	return el != null && el != '';
	});
	var range = filtered[0];
	if (filtered.length > 1) {range = range + "/" + filtered[1]}
	if (filtered.length > 2) {range = range + "/" + filtered[2]}
    return range;
}
function affe(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
  	return el != null && el != '';
	});
	var affe = filtered[0];
	if (filtered.length > 1) {affe = affe + "\n" + filtered[1]}
	if (filtered.length > 2) {affe = affe + "\n" + filtered[2]}
    return affe;
}
function na(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	output = output.trim();
	var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
  	return el != null && el != '';
	});
	var na = filtered[0];
	if (filtered.length > 1) {na = na + " " + filtered[1]}
	if (filtered.length > 2) {na = na + " " + filtered[2]}
	if (filtered.length > 3) {na = na + " " + filtered[3]}
	if (filtered.length > 4) {na = na + " " + filtered[4]}
    return na;
}
module.exports = FindSkill;
