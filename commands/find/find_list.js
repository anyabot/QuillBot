var request = require('request');
var cheerio = require('cheerio');
const commando = require('discord.js-commando');
const Discord = require('discord.js');
require('@gouch/to-title-case')
var he = require('he');
var urlencode = require('urlencode');
var pluralize = require('pluralize')


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
        var cl = text.toLowerCase().toTitleCase();
	    if (cl == "Intermediate Dragon Soldier" || cl == "Intermediate Dragon Soldiers") {cl = "Dragon Soldiers"}
else if (cl == "Priestess Warrior" || cl == "Priestess Warriors") {cl = "Priest Warriors"}
else if (cl == "We" || cl == "White Empire") {cl = "White Empire"}
else if (cl == "Kingdom Of Pars" || cl == "Pars" || cl == "Kingdom of Pars") {cl = "Kingdom of Pars"}
else if (cl == "Angels Races") {cl = "Angels Race"}
else if (cl == "Hermits Races") {cl = "Hermits Race"}
else if (cl == "Majin" || cl == "Jiangshi" || cl == "Zhenren" || cl == "Onmyouji" || cl == "Spirit of War" || cl == "Youkai" || cl == "Youko" || cl == "Fuuhaku" || cl == "Raikou" || cl == "Nekomata" || cl == "Nurarihyon" || cl == "Oni" || cl == "Tengu" || cl == "Beastfolk" || cl == "None" || cl == "Undead" || cl == "Desert Country" || cl == "Samurai" || cl == "Heavy Artillery") {
				cl = cl;
			}
			else if (cl.slice(-1) == "\】" || cl.slice(-1) == "\)") {
				let words = cl.split(' ');
				let le = words.length;
				words[le-2] = pluralize.plural(words[le-2])
				cl = words.join(" ")
			}
			else {
				cl = pluralize.plural(cl);
			}
var link = "https://aigis.fandom.com/wiki/Category%3A" + urlencode(cl)

request(link, function(err, resp, html) {
	if (!err) {
    var check = false 
    var pages = [];
    var page = 1;
    const $ = cheerio.load(html);
    $('.listtable.bgwhite tr td div a img').each(function(i, elem) {
      check = true
      let img = $(elem).attr('data-src')
      let nam =$(elem).attr('alt');
      nam = nam.split(" Icon")[0]
      check = true
      let embed = new Discord.RichEmbed()
      img = img.split("/scale-to-width-down/")[0]
      embed.setTitle(nam)
      embed.setImage(img)
      pages.push(embed)
    })
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
module.exports = FindImage;
