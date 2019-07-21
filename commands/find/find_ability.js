const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');


class FindAbility extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ability',
            group: 'find',
            memberName: 'ability',
            description: 'find abilities of an unit'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        if (name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

request(link, function(err, resp, html) {
  if (!err) {

    const $ = cheerio.load(html);
    var output;
    var img;
    var aff;
    var pages = [];
    var page = 1;
    var silver = $('.categories').text().includes("Rarity:Silver");
    var check = false;
    output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
    if (silver) {
      output = $('.c2.numbers').first().text();
      if (output) {
        output = $('.c2.numbers td:nth-child(8)').first().html();
        aff = na(output);
        if (aff != "N/A") {
          check = true;
          var silna = aff;
          var silimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
          let embed = new Discord.RichEmbed()
          embed.setTitle(silna)
          embed.setThumbnail(silimg)
          let link2 = "https://aigis.fandom.com/wiki/Ability/" + silna;
          request(link2, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = $2('.gcstyle tr:nth-child(3) td:nth-child(2)').text().trim();
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
		    pages.push(embed)
            }
          })
        }
      }

    }
    if (!silver) {
      output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
      if (output) {
        output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(14)').first().html();
        aff = na(output);
        if (aff != "N/A") {
	check = true;
          var norna = aff;
          var norimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
	let embed = new Discord.RichEmbed()
          embed.setTitle(norna)
          embed.setThumbnail(norimg)
          let link2 = "https://aigis.fandom.com/wiki/Ability/" + norna;
          request(link2, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = te2($2('.gcstyle tr:nth-child(3) td:nth-child(2)').text());
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
		    pages.push(embed)
            }
          })
        }
      }
      output = $('.c3.numbers').first().text();
      if (output) {
        output = $('.c3 td:nth-child(13)').first().html();
        aff = na(output);
        if (aff != "N/A") {
	check = true;
          var awna = aff;
          var awimg = ($('.c3 td:first-child div a img').attr('data-src'));
          let embed = new Discord.RichEmbed()
          embed.setTitle(awna)
          embed.setThumbnail(awimg)
          let link2 = "https://aigis.fandom.com/wiki/Ability/" + awna;
          request(link2, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = te2($2('.gcstyle tr:nth-child(3) td:nth-child(2)').text());
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              embed.addField("Description", des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
		    pages.push(embed)
            }
          })
        }
      }
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
})
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
module.exports = FindAbility;
