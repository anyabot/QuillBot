const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var functions = require('../../functions.js');
require('@gouch/to-title-case')
var urlencode = require('urlencode');

class FindAbility extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'ability',
		aliases: ['a'],
            	group: 'find',
            	memberName: 'ability',
            	description: 'find abilities of an unit',
		examples: ['&ability quill'],
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

request(link, function(err, resp, html) {
  if (!err) {

    const $ = cheerio.load(html);
    var output;
    var img = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));;
    var aff;
    var pages = [];
    var page = 1;
	  var nor = false;
	  var aw = false;
    var silver = $('.categories').text().includes("Rarity:Silver");
	  var bronze = $('.categories').text().includes("Rarity:Bronze");
    var check = false;
	  if (!silver && !bronze){
	output = $('.c3.numbers').first().text();
      if (output) {
	if ($('.c3 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c3 td:nth-child(13)').first().html();
			}
			if (!$('.c3 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c3 td:nth-child(12)').first().html();
			}
        aff = na(output);
        if (aff != "N/A") {
		aw = true;
	}
	  }
	  output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
      if (output) {
        output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(14)').first().html();
        aff = na(output);
        if (aff != "N/A") {
		nor = true;
	}
      }
	  }
    output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
    if (silver) {
      output = $('.c2.numbers').first().text();
      if (output) {
        output = $('.c2.numbers td:last-child').first().html();
        aff = na(output);
        if (aff != "N/A") {
          check = true;
          var silna = aff;
          var silimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
          let embed = new Discord.RichEmbed()
          embed.setTitle(unit + "'s Ability")
		embed.setURL(link)
          embed.setThumbnail(silimg)
		embed.setColor('WHITE')
          let link2 = "https://aigis.fandom.com/wiki/Ability/" + urlencode(silna);
           request(link2, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = $2('.gcstyle tr:nth-child(3) td:nth-child(2)').text().trim();
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              embed.addField(silna, des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
		    message.channel.send(embed)
            }
          })
		
        }
      }
    }
if (bronze || (!aw && nor)) {
      output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
      if (output) {
        output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(14)').first().html();
        aff = na(output);
        if (aff != "N/A") {
	check = true;
          var norna = aff;
          var norimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
	let embed = new Discord.RichEmbed()
          embed.setTitle(unit + "'s Ability")
		embed.setURL(link)
          embed.setThumbnail(norimg)
		embed.setColor('DARK_ORANGE')
          let link2 = "https://aigis.fandom.com/wiki/Ability/" + urlencode(norna);
           request(link2, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = te2($2('.gcstyle tr:nth-child(3) td:nth-child(2)').text());
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              if (des != '' && des != null) embed.addField(norna, des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
		    message.channel.send(embed)
            }
          })

        }
      }
    }
	  if (aw && !nor) {
      output = $('.c3.numbers').first().text();
      if (output) {
        if ($('.c3 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c3 td:nth-child(13)').first().html();
			}
			if (!$('.c3 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c3 td:nth-child(12)').first().html();
			}
        aff = na(output);
        if (aff != "N/A") {
	check = true;
          var awna = aff;
          var awimg = ($('.c3 td:first-child div a img').attr('data-src'));
	if ($('.c3 td:nth-child(3)').hasClass('leftal')) {
			awimg = ($('.c3 td:first-child div a img').attr('data-src'));
		}
		if (!$('.c3 td:nth-child(3)').hasClass('leftal')) {
			awimg = img
		}
          let embed = new Discord.RichEmbed()
          embed.setTitle(unit + "'s Awakened Ability")
		embed.setURL(link)
          embed.setThumbnail(awimg)
		embed.setColor('BLUE')
          let link2 = "https://aigis.fandom.com/wiki/Ability/" + urlencode(awna);
            request(link2, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = te2($2('.gcstyle tr:nth-child(3) td:nth-child(2)').text());
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              if (des != '' && des != null) embed.addField(awna, des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
			message.channel.send(embed)
            }
          })

        }
      }
        }
    if (aw && nor) {
      output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
      if (output) {
        output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(14)').first().html();
        aff = na(output);
        if (aff != "N/A") {
	check = true;
          var norna = aff;
          var norimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
	let embed = new Discord.RichEmbed()
          embed.setTitle(unit + "'s Ability")
		embed.setURL(link)
          embed.setThumbnail(norimg)
		embed.setColor('LIGHT_GREY')
          let link2 = "https://aigis.fandom.com/wiki/Ability/" + urlencode(norna);
           request(link2, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = te2($2('.gcstyle tr:nth-child(3) td:nth-child(2)').text());
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              if (des != '' && des != null) embed.addField(norna, des);
              if (note != '' && note != null) {embed.addField("Notes", note)};
		    pages.push(embed)
		    output = $('.c3.numbers').first().text();
      if (output) {
        if ($('.c3 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c3 td:nth-child(13)').first().html();
			}
			if (!$('.c3 td:nth-child(3)').hasClass('leftal')) {
				output = $('.c3 td:nth-child(12)').first().html();
			}
        aff = na(output);
        if (aff != "N/A") {
	check = true;
          var awna = aff;
          var awimg = ($('.c3 td:first-child div a img').attr('data-src'));
		if ($('.c3 td:nth-child(3)').hasClass('leftal')) {
			awimg = ($('.c3 td:first-child div a img').attr('data-src'));
		}
		if (!$('.c3 td:nth-child(3)').hasClass('leftal')) {
			awimg = norimg
		}
          let embed2 = new Discord.RichEmbed()
          embed2.setTitle(unit + "'s Awakened Ability")
		embed2.setURL(link)
          embed2.setThumbnail(awimg)
		embed2.setColor('BLUE')
          let link3 = "https://aigis.fandom.com/wiki/Ability/" + urlencode(awna);
            request(link3, function(err, resp, html) {
            if (!err) {
              let $2 = cheerio.load(html)
              let des = te2($2('.gcstyle tr:nth-child(3) td:nth-child(2)').text());
              let note = $2('.gcstyle tr:nth-child(3) td:nth-child(4)').text().trim();
              if (des != '' && des != null) embed2.addField(awna, des);
              if (note != '' && note != null) {embed2.addField("Notes", note)};
			        pages.push(embed2)
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
      }
            })
        }
      }
		    
    }
           


                if (!check) {message.channel.send("No Data")};
    
  }
	    
})
    }
}

function te(output) {
	if (output == null) {return null}
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
	if (output == null) {return null}
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
	if (output == null) {return null}
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
