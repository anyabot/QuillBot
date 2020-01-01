const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var functions = require('../../functions.js');
require('@gouch/to-title-case')
var urlencode = require('urlencode');


class FindImage extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'image',
		aliases: ['images', 'img', 'i'],
            group: 'find',
            memberName: 'image',
            description: 'find images of an unit',
		examples: ['&image quill'],
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
    var check = false;
    var img;
    var pages = [];
    var page = 1;
    img = ($('.BaseGallery div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.BaseGallery div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
	  img = ($('.\\_toggle.Normalskill div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.\\_toggle.Normalskill div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
    img = ($('.AWGallery div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.AWGallery div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
	  img = ($('.\\_toggle.AWskill div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.\\_toggle.AWskill div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
    img = ($('.AW2Gallery div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.AW2Gallery div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
	  img = ($('.\\_toggle.AW2skill div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.\\_toggle.AW2skill div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
    img = ($('.AW2v1Gallery div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.AW2v1Gallery div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
	  img = ($('.\\_toggle.AW2v1skill div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.\\_toggle.AW2v1skill div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
    img = ($('.AW2v2Gallery div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.AW2v2Gallery div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
	  img = ($('.\\_toggle.AW2v2skill div:nth-child(2) a img').attr('data-src'));
    if (img) {
      let nam =($('.\\_toggle.AW2v2skill div:nth-child(2) a img').attr('alt'));
      let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
    }
    for (var i = 1; i < 5; i++) {
      img = ($('.AVer\\.Gallery div:nth-child(' + i + ') a img').attr('data-src'));
      if (img) {
        let nam =($('.AVer\\.Gallery div:nth-child(' + i + ') a img').attr('alt'));
        let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
      }
    }
	  for (var i = 1; i < 5; i++) {
      img = ($('.\\_toggle.AAskill div:nth-child(' + i + ') a img').attr('data-src'));
      if (img) {
        let nam =($('.\\_toggle.AAskill div:nth-child(' + i + ') a img').attr('alt'));
        let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
      }
    }
	  if (pages.length == 0) {
      ($('.image.lightbox')).each(function(i, elem) {
        img = $(this).find('img').attr('data-src')
        let nam = $(this).find('img').attr('alt')
        let pa = nam.split(" Render")
        if (pa.length > 1) {
          nam = pa[0]
          check = true
          let embed = new Discord.RichEmbed()
          img = img.split("/scale-to-width-down/")[0]
          embed.setTitle(nam)
          embed.setImage(img)
		embed.setURL(link)
          pages.push(embed)
        }
      });
    }
		if (check) {
		functions.sende(message, pages)
	    }
                if (!check) {message.channel.send("No Data")};
            }
        });
    }
}
module.exports = FindImage;
