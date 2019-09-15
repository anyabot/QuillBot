var request = require('request');
var cheerio = require('cheerio');
const commando = require('discord.js-commando');
const Discord = require('discord.js');
require('@gouch/to-title-case')
var he = require('he');
var urlencode = require('urlencode');
var pluralize = require('pluralize')
var suffix = require('../../library/suf.js').suffix;
var list = require('../../loli.js').list


class FindImage extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'find',
            memberName: 'list',
            description: 'find list of all units of a certain class/faction',
		examples: ['&list soldiers'],
        args: [{
		    key: 'text',
			prompt: 'What class/faction do you want to know about?',
		    type: 'string'
		}]
        });
    }

    async run(message, { text }) {
		var lcheck = false
        var cl = text.toLowerCase().toTitleCase();
	    cl = cl.split(' And ').join(' and ')
	    var words = cl.split(' ');
	    var le = words.length;
		if (cl == "Loli" || cl =="Lolis") {
			lcheck = true
		}
	    else if (cl == "Intermediate Dragon Soldier" || cl == "Intermediate Dragon Soldiers") {cl = "Dragon Soldiers"}
		else if (cl == "Priestess Warrior" || cl == "Priestess Warriors") {cl = "Priest Warriors"}
		else if (cl == "We" || cl == "White Empire") {cl = "White Empire"}
		else if (cl == "Kingdom Of Pars" || cl == "Pars" || cl == "Kingdom of Pars") {cl = "Kingdom of Pars"}
		else if (cl == "Angels Races") {cl = "Angels Race"}
		else if (cl == "Hermits Races") {cl = "Hermits Race"}
	    else if (cl == "Spirit of War") {cl = "Spirits of War"}
	    else if (cl == "June Bride" || cl == "Summer" || cl == "School" || cl == "Valentine's Day" || cl == "New Year's" || cl == "Christmas" || cl == "Halloween" || cl == "Chibi") {cl = cl + " Units"}
		else if (cl == "Majin" || cl == "Jiangshi" || cl == "Zhenren" || cl == "Onmyouji" || cl == "Youkai" || cl == "Youko" || cl == "Fuuhaku" || cl == "Raikou" || cl == "Nekomata" || cl == "Nurarihyon" || cl == "Oni" || cl == "Tengu" || cl == "Beastfolk" || cl == "None" || cl == "Undead" || cl == "Desert Country" || cl == "Samurai" || cl == "Heavy Artillery") {
			cl = cl;
		}
	    else if (cl == "Elf" || cl == "Elves") {cl = "Elves:Stats"}
		else if (cl.slice(-1) == "\】" || cl.slice(-1) == "\)") {
			words[le-2] = pluralize.plural(words[le-2])
			if (suffix[words[le-1]]) {words[le-1] = suffix[words[le-1]]}
			cl = words.join(" ")
		}
	    else if (suffix[words[le-1]]) {
	    	words[le-2] = pluralize.plural(words[le-2])
			if (suffix[words[le-1]]) {words[le-1] = suffix[words[le-1]]}
			cl = words.join(" ")
	    }
		else {
			if (suffix[words[le-1]]) {words[le-1] = suffix[words[le-1]]}
			cl = words.join(" ")
			cl = pluralize.plural(cl);
		}
		if (lcheck) {
			var pages = []
			for (var i = 0; i < list.length; i++) {
				let nam =  list[i][0]
				let img = list[i][1]
				let lin = "https://aigis.fandom.com/wiki/" + urlencode(nam.split(' ')[0])
				let embed = new Discord.RichEmbed()
				img = img.split("/scale-to-width-down/")[0]
				embed.setTitle(nam)
				embed.setImage(img)
				embed.setURL(lin)
				pages.push(embed)
			}
			sendembed(pages, message)
		}
		else {
			var link = "https://aigis.fandom.com/wiki/Category%3A" + urlencode(cl)

			request(link, function(err, resp, html) {
				if (!err) {
				var check = false 
				var parts = []
				var pages = [];
				var pn = []
				var pm = []
				const $ = cheerio.load(html);
				$('.listtable.bgwhite tr td div a img').each(function(i, elem) {
				check = true
				let img = $(elem).attr('data-src')
				if (!img) {img = $(elem).attr('src')}
				let nam =$(elem).attr('alt');
				nam = he.decode(nam)
				nam = nam.split(" Icon")[0]
				let lin = "https://aigis.fandom.com/wiki/" + urlencode(nam)
				check = true
				let embed = new Discord.RichEmbed()
				img = img.split("/scale-to-width-down/")[0]
				embed.setTitle(nam)
				embed.setImage(img)
				embed.setURL(lin)
				if (pages.length == 10) {
					parts.push(pages)
					pages = []
					pages.push(embed)
				}
				else (pages.push(embed))
				})
				if (check) {
					parts.push(pages)
					for (var i = 0; i < parts.length; i++) {
						pn.push(1)
						pm.push(parts[i].length)
					}
					for (var i = 0; i < parts.length; i++) {
						sendembed(parts[i], message)
					}
				}
				if (!check) {message.channel.send("No Data")};
				}
			})
		}
    }
}
function sendembed(pg, message) {
	let embed = pg[0];
	let pn = 1
				embed.setFooter('Page ' + pn + ' of ' + pg.length);
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
				if (pn === 1) return;
				pn = pn - 1;
				embed = pg[pn - 1];
				embed.setFooter('Page ' + pn + ' of ' + pg.length);
				msg.edit(embed)
			})

			forwards.on('collect', r => {
				r.remove(r.users.filter(u => !u.bot).first());
				if (pn === pg.length) return;
				pn = pn + 1;
				embed = pg[pn - 1];
				embed.setFooter('Page ' + pn + ' of ' + pg.length);
				msg.edit(embed)
		})
	    })
	})
}
module.exports = FindImage;
