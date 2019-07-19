const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');

class FindStat extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stat',
            group: 'find',
            memberName: 'stat',
            description: 'find stats of an unit'
        });
    }

    async run(message, input) {
        var unit = functions.toTitleCase(input);
        if (name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                var text;
		var output;
                        
		output = $('.c3.numbers').first().text();
		if(output) {
                	var lv99v1 = lv99line(output);
                	output = $('.c3 ').first().text();
                	var lv1v1 = lv1line(output);
			var img = ($('.c3 td:first-child div a').attr('href'));
			const embed3 = new Discord.RichEmbed()
			embed3.setTitle(lv1v1[0] + "(" + lv1v1[1] + " → " + lv99v1[0] + ")")
			embed3.setThumbnail(img)
			embed3.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
			embed3.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
			embed3.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
			embed3.addField("Range", lv99v1[4], true)
			embed3.addField("MR", lv1v1[5], true)
			embed3.addField("Block", lv1v1[6], true)
			embed3.addField("Max Cost", lv1v1[7], true)
			embed3.addField("Min Cost", lv1v1[8], true)
			message.channel.send({embed3});
		}
                output = $('.c4.numbers').first().text();
		if(output) {
                	var lv99v1 = lv99line(output);
                	output = $('.c4 ').first().text();
                	var lv1v1 = lv1line(output);
			var img2 = ($('.c4 td:first-child div a').attr('href'));
			if (img2) {img = img2)
			const embed4 = new Discord.RichEmbed()
			embed4.setTitle(lv1v1[0] + "(" + lv1v1[1] + " → " + lv99v1[0] + ")")
			embed4.setThumbnail(img)
			embed4.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
			embed4.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
			embed4.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
			embed4.addField("Range", lv99v1[4], true)
			embed4.addField("MR", lv1v1[5], true)
			embed4.addField("Block", lv1v1[6], true)
			embed4.addField("Max Cost", lv1v1[7], true)
			embed4.addField("Min Cost", lv1v1[8], true)
			message.channel.send({embed4});
		}
                output = $('.c5.numbers').first().text();
		if(output) {
                	var lv99v1 = lv99line(output);
                	output = $('.c5 ').first().text();
                	var lv1v1 = lv1line(output);
			var img2 = ($('.c5 td:first-child div a').attr('href'));
			if (img2) {img = img2)
			const embed5 = new Discord.RichEmbed()
			embed5.setTitle(lv1v1[0] + "(" + lv1v1[1] + " → " + lv99v1[0] + ")")
			embed5.setThumbnail(img)
			embed5.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
			embed5.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
			embed5.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
			embed5.addField("Range", lv99v1[4], true)
			embed5.addField("MR", lv1v1[5], true)
			embed5.addField("Block", lv1v1[6], true)
			embed5.addField("Max Cost", lv1v1[7], true)
			embed5.addField("Min Cost", lv1v1[8], true)
			message.channel.send({embed});
		}
            }
        });
    }
}

function lv99line(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
    output = output.trim();
    var arr = output.split('\n');

    if (arr[4].length > 3) {
        var range = arr[4].substring(0, 3) + "/" + arr[4].substring(3, 6) + "/" + arr[4].substring(6, 9);
        arr[4] = range;
        return arr;
    }
    else
        return arr;
}

function lv1line(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
    output = output.trim();
    var arr = output.split('\n');

   return arr;
}
module.exports = FindStat;
