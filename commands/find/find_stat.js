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
                        

                var output = $('.c4.numbers').first().text();
		message.channel.send($('.c4.numbers').first().text());
                var lv99v1 = lv99line(output);
                output = $('.c4 ').first().text();
                var lv1v1 = lv1line(output);
		const embed = new Discord.RichEmbed()
		.setTitle(lv1v1[0] + "(" + lv1v1[1] + " → " + lv99v1[0] + ")")
		.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
		.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
		.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
		.addField("Range", lv99v1[4], true)
		.addField("MR", lv1v1[5], true)
		.addField("Block", lv1v1[6], true)
		.addField("Max Cost", lv1v1[7], true)
		.addField("Min Cost", lv1v1[8], true)
		message.channel.send({embed});
				
                
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