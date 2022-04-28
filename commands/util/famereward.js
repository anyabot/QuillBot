const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');

class UtilDaily extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'famereward',
      aliases: ['fr'],
      group: 'util2',
      memberName: 'famereward',
      description: 'show fame additional rewards',
      examples: ['&famereward'],
    });
  }

  async run(message, input) {
    var link = "https://aigis.fandom.com/wiki/Fame";

    request(link, function (err, resp, html) {
      if (!err) {
        const $ = cheerio.load(html);
        var output
        var embed = new Discord.RichEmbed()
        embed.setTitle("Fame Rewards")
        $('.wikitable.mw-collapsible.mw-collapsed').each(function (i, elem) {
          output = $(elem).find('tr').find('th').first().text().trim();
          if (output == "Additional Rewards") {
            let len = $(elem).find('tr').length
            for (var j = 2; j < len; j++) {
              let pt1 = $(elem).find('tr').eq(j).children().eq(0).text().trim()
              let re1 = $(elem).find('tr').eq(j).children().eq(2).text().trim()
              embed.addField(pt1 + " Points", re1, true)
            }
            for (var j = 2; j < len; j++) {
              let pt2 = $(elem).find('tr').eq(j).children().eq(4).text().trim()
              let re2 = $(elem).find('tr').eq(j).children().eq(6).text().trim()
              if (re2) { embed.addField(pt2 + " Points", re2, true) }
            }
          }
        })
        message.channel.send(embed)
      }
    })
  }
}

module.exports = UtilDaily;
