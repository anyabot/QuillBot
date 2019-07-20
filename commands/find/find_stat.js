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
	message.channel.send(unit);
        var link = "https://aigis.fandom.com/wiki/" + unit;
	    message.channel.send(link);

        request(link, function (err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                var text;
		var output;
                var img;
		var check = false;
		var pages = []
		var page = 1;
		output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
                if(output) {
			check = true;
                	let lv1v1 = lv1line(output);
                	output = $('.listtable.bgwhite tr:nth-child(4)').first().text();
                	let lv99v1 = lv99line(output);
			img = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a').attr('href'));
			let embed = new Discord.RichEmbed()
			.setTitle(lv1v1[3] + " (" + lv1v1[4] + " → " + lv99v1[0] + ")")
			.setThumbnail(img)
			.addField("HP", lv1v1[5] + " → " + lv99v1[1], true)
			.addField("ATK", lv1v1[6] + " → " + lv99v1[2], true)
			.addField("DEF", lv1v1[7] + " → " + lv99v1[3], true)
			.addField("Range", lv99v1[4], true)
			.addField("MR", lv1v1[8], true)
			.addField("Block", lv1v1[9], true)
			.addField("Max Cost", lv1v1[10], true)
			.addField("Min Cost", lv1v1[11], true)
			pages.push(embed);
		}
		if ($('.listtable.bgwhite tr').length >= 5) {
			output = $('.c2.numbers').first().text();
			if(output) {
                		let lv99v1 = lv99line(output);
                		output = $('.c2 ').first().text();
                		let lv1v1 = lv1line(output);
				let embed = new Discord.RichEmbed()
				.setTitle(lv1v1[0] + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
				.setThumbnail(img)
				.setColor('RED')
				.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
				.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
				.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
				.addField("Range", lv99v1[4], true)
				.addField("MR", lv1v1[5], true)
				.addField("Block", lv1v1[6], true)
				.addField("Max Cost", lv1v1[7], true)
				.addField("Min Cost", lv1v1[8], true)
				pages.push(embed);
			}
		}
		output = $('.c3.numbers').first().text();
		if(output) {
                	let lv99v1 = lv99line(output);
                	output = $('.c3 ').first().text();
                	let lv1v1 = lv1line(output);
			img = ($('.c3 td:first-child div a').attr('href'));
			let embed = new Discord.RichEmbed()
			.setTitle(lv1v1[0] + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
			.setThumbnail(img)
			.setColor('BLUE')
			.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
			.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
			.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
			.addField("Range", lv99v1[4], true)
			.addField("MR", lv1v1[5], true)
			.addField("Block", lv1v1[6], true)
			.addField("Max Cost", lv1v1[7], true)
			.addField("Min Cost", lv1v1[8], true)
			pages.push(embed)
		}
                output = $('.c4.numbers').first().text();
		if(output) {
                	let lv99v1 = lv99line(output);
                	output = $('.c4 ').first().text();
                	let lv1v1 = lv1line(output);
			let img2 = ($('.c4 td:first-child div a').attr('href'));
			if (img2) {img = img2}
			let embed = new Discord.RichEmbed()
			.setTitle(lv1v1[0] + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
			.setThumbnail(img)
			.setColor('DARK_PURPLE')
			.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
			.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
			.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
			.addField("Range", lv99v1[4], true)
			.addField("MR", lv1v1[5], true)
			.addField("Block", lv1v1[6], true)
			.addField("Max Cost", lv1v1[7], true)
			.addField("Min Cost", lv1v1[8], true)
			pages.push(embed)
		}
		output = $('.c5.numbers').first().text();
		if(output) {
                	let lv99v1 = lv99line(output);
                	output = $('.c5 ').first().text();
                	let lv1v1 = lv1line(output);
			let img2 = ($('.c5 td:first-child div a').attr('href'));
			if (img2) {img = img2}
			let embed = new Discord.RichEmbed()
			.setTitle(lv1v1[0] + " (" + lv1v1[1] + " → " + lv99v1[0] + ")")
			.setThumbnail(img)
			.setColor('DARK_PURPLE')
			.addField("HP", lv1v1[2] + " → " + lv99v1[1], true)
			.addField("ATK", lv1v1[3] + " → " + lv99v1[2], true)
			.addField("DEF", lv1v1[4] + " → " + lv99v1[3], true)
			.addField("Range", lv99v1[4], true)
			.addField("MR", lv1v1[5], true)
			.addField("Block", lv1v1[6], true)
			.addField("Max Cost", lv1v1[7], true)
			.addField("Min Cost", lv1v1[8], true)
			pages.push(embed)
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
