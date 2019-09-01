const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
const random = require('random')
var urlencode = require('urlencode');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
const Canvas = require('canvas');
var functions = require('../../functions.js');
var fs = require('fs');

class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'teamadd',
            	group: 'team',
            	memberName: 'teamadd',
            	description: 'add an unit to your team',
		examples: ['&teamadd'],
		hidden: true
        });
    }

    async run(message, input) {
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
	          team.on('error', err => console.error('Keyv connection error:', err));
            var uteam = await team.get(message.author.id)
            if (uteam == undefined) {uteam = []}
    var parts = input.toLowerCase().split(" ")
    var last = parts.pop()
    var state = "base"
    if (last == "aw") {
      state = "AW"
    } 
    else if (last == "aw2") {
      state = "AW2"
    }
    else if (last == "aw2v1") {
      state = "AW2v1"
    }
    else if (last == "aw2v2") {
      state = "AW2v2"
    }
    else {
      parts.push(last)
    }
    var text = parts.join(" ")
      var unit = functions.nameChange(text)
      if (state == "base") {
        var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png" 
      }
      else {
        var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_" + urlencode(state) + "_Icon.png" 
      }
      request(link, function(err, resp, html) {
				if (!err) {
					const $ = cheerio.load(html);
					var img = $('.fullImageLink a').attr('href')
					if (img) {
            if (uteam.length > 15) {message.channel.send("Full team")}
            else {
              uteam.push([unit, state])
              team.set(message.author.id, uteam)
              var embed = new Discord.RichEmbed()
              embed.setTitle(unit)
              embed.setImage(img)
              message.channel.send(embed);
            }
					}
          else (message.channel.send("Wrong Input"))
				}
     })
	}
}
module.exports = RanRoll;
