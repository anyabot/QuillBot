const commando = require('discord.js-commando');
const Discord = require('discord.js');
var moment = require('moment');
var printf = require('printf');
var name = require('../../library/orb.js').name;

class FindDrop extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'dropboost',
              aliases: ['db', 'dropbooster'],
            	group: 'util2',
            	memberName: 'dropboost',
            	description: 'show units which drop boost ability',
		examples: ['&dropboost dc'],
		args: [{
		    key: 'text',
			prompt: 'What AW Prince do you want to know about?',
		    type: 'string',
		default: "all"
		}]
        });
    }
	async run(message, { text }) {
		var drop = text.toLowerCase()
    var pages = [];
		var page = 1;
    var check = false;
		if (drop == "all"){
			check = true;
			var robert = new Discord.RichEmbed()
			robert.setTitle('Robert')
			robert.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/e/e9/Robert_Icon.png/revision/latest?cb=20180522222426')
			robert.setColor('GOLD')
			robert.addField('Pre-AW Ability', 'While in your possession, the drop rate of Trust items increases by 6%.')
			robert.addField('AW Ability', 'While in your possession, the drop rate of Trust items increases by 8%.')
			pages.push(robert)
			var cuterie = new Discord.RichEmbed(
			cuterie.setTitle('Cuterie')
			cuterie.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/2/23/Cuterie_Icon.png/revision/latest?cb=20180522212200')
			cuterie.setColor('GOLD')
			cuterie.addField('Pre-AW Ability', 'While in your possession, the drop rate of Affection items increases by 6%.')
			cuterie.addField('AW Ability', 'While in your possession, the drop rate of Affection items increases by 8%.')
			pages.push(cuterie)
			var ccuterie = new Discord.RichEmbed(
			ccuterie.setTitle('Chibi Cuterie')
			ccuterie.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/a/ad/Chibi_Cuterie_Icon.png/revision/latest?cb=20190502061222')
			ccuterie.setColor('GOLD')
			ccuterie.addField('Ability', 'While in your possession, the drop rate of Affection items increases by 6%.')
			pages.push(ccuterie)
			var monica = new Discord.RichEmbed()
			monica.setTitle('Monica')
			monica.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/2/21/Monica_Icon.png/revision/latest?cb=20180522221404')
			monica.setColor('GOLD')
			monica.addField('Pre-AW Ability', 'While in your possession, the drop rate of Demon Crystals increases by 7%.')
			monica.addField('AW Ability', 'While in your possession, the drop rate of Demon Crystals increases by 9%.')
			pages.push(monica)
			var julia = new Discord.RichEmbed()
			julia.setTitle('Julia')
			julia.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/f/fe/Julia_Icon.png/revision/latest?cb=20180607072007')
			julia.setColor('WHITE')
			julia.addField('Pre-AW Ability', 'While in your possession, the drop rate of Trust and Affection items increases by 8%, while the drop rate of Demon Crystals increases by 9%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			julia.addField('AW Ability', 'While in your possession, the drop rate of Trust items, Affection items, and Demon Crystals increases by 10%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			pages.push(julia)
			var seria = new Discord.RichEmbed()
			seria.setTitle('Seria')
			seria.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/6/64/Seria_Icon.png/revision/latest?cb=20180522223013')
			seria.setColor('WHITE')
			seria.addField('Pre-AW Ability', 'While in your possession, the drop rate of Spirits increases by 5%.')
			seria.addField('AW Ability', 'While in your possession, the drop rate of Spirits increases by 6%.')
			pages.push(seria)
			var amanda = new Discord.RichEmbed()
			amanda.setTitle('Amanda')
			amanda.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/f/f9/Amanda_Icon.png/revision/latest?cb=20180522205700')
			amanda.setColor([95, 64, 0])
			amanda.addField('Pre-AW Ability', 'While in your possession, the drop rate of Gold Armors and Platinum Armors increases by 6%.')
			amanda.addField('AW Ability', 'While in your possession, the drop rate of Gold Armors and Platinum Armors increases by 9%.')
			pages.push(amanda)
			var camanda = new Discord.RichEmbed()
			camanda.setTitle('Chibi Amanda')
			camanda.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/9/9c/Chibi_Amanda_Icon.png/revision/latest?cb=20190207071753')
			camanda.setColor('GOLD')
			camanda.addField('Ability', 'While in your possession, the drop rate of Gold Armors and Platinum Armors increases by 6%.')
			pages.push(camanda)
			var junon = new Discord.RichEmbed()
			junon.setTitle('Junon')
			junon.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/e/e2/Junon_Icon.png/revision/latest?cb=20180522220158')
			junon.setColor('WHITE')
			junon.addField('Pre-AW Ability', 'While in your possession, with the exception of Spirits, the drop rate of Silver units increases by 6%.')
			junon.addField('AW Ability', 'While in your possession, with the exception of Spirits, the drop rate of Silver units increases by 8%.')
			pages.push(junon)
		}
		else if (drop == "trust" || drop == "trust item" || drop == "trust items") {
			check = true;
			var robert = new Discord.RichEmbed()
			robert.setTitle('Robert')
			robert.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/e/e9/Robert_Icon.png/revision/latest?cb=20180522222426')
			robert.setColor('GOLD')
			robert.addField('Pre-AW Ability', 'While in your possession, the drop rate of Trust items increases by 6%.')
			robert.addField('AW Ability', 'While in your possession, the drop rate of Trust items increases by 8%.')
			pages.push(robert)
			var julia = new Discord.RichEmbed()
			julia.setTitle('Julia')
			julia.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/f/fe/Julia_Icon.png/revision/latest?cb=20180607072007')
			julia.setColor('WHITE')
			julia.addField('Pre-AW Ability', 'While in your possession, the drop rate of Trust and Affection items increases by 8%, while the drop rate of Demon Crystals increases by 9%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			julia.addField('AW Ability', 'While in your possession, the drop rate of Trust items, Affection items, and Demon Crystals increases by 10%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			pages.push(julia)
		}
		else if (drop == "aff" || drop == "affection" || drop == "affection item" || drop == "affection items") {
			check = true;
			var cuterie = new Discord.RichEmbed(
			cuterie.setTitle('Cuterie')
			cuterie.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/2/23/Cuterie_Icon.png/revision/latest?cb=20180522212200')
			cuterie.setColor('GOLD')
			cuterie.addField('Pre-AW Ability', 'While in your possession, the drop rate of Affection items increases by 6%.')
			cuterie.addField('AW Ability', 'While in your possession, the drop rate of Affection items increases by 8%.')
			pages.push(cuterie)
			var ccuterie = new Discord.RichEmbed(
			ccuterie.setTitle('Chibi Cuterie')
			ccuterie.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/a/ad/Chibi_Cuterie_Icon.png/revision/latest?cb=20190502061222')
			ccuterie.setColor('GOLD')
			ccuterie.addField('Ability', 'While in your possession, the drop rate of Affection items increases by 6%.')
			pages.push(ccuterie)
			var julia = new Discord.RichEmbed()
			julia.setTitle('Julia')
			julia.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/f/fe/Julia_Icon.png/revision/latest?cb=20180607072007')
			julia.setColor('WHITE')
			julia.addField('Pre-AW Ability', 'While in your possession, the drop rate of Trust and Affection items increases by 8%, while the drop rate of Demon Crystals increases by 9%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			julia.addField('AW Ability', 'While in your possession, the drop rate of Trust items, Affection items, and Demon Crystals increases by 10%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			pages.push(julia)
		}
		else if (drop == "dc" || drop == "demon crystal" || drop == "demon crystals" || drop == "magic crystal" || drop == "magic crystals") {
			check = true;
			var monica = new Discord.RichEmbed()
			monica.setTitle('Monica')
			monica.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/2/21/Monica_Icon.png/revision/latest?cb=20180522221404')
			monica.setColor('GOLD')
			monica.addField('Pre-AW Ability', 'While in your possession, the drop rate of Demon Crystals increases by 7%.')
			monica.addField('AW Ability', 'While in your possession, the drop rate of Demon Crystals increases by 9%.')
			pages.push(monica)
			var julia = new Discord.RichEmbed()
			julia.setTitle('Julia')
			julia.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/f/fe/Julia_Icon.png/revision/latest?cb=20180607072007')
			julia.setColor('WHITE')
			julia.addField('Pre-AW Ability', 'While in your possession, the drop rate of Trust and Affection items increases by 8%, while the drop rate of Demon Crystals increases by 9%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			julia.addField('AW Ability', 'While in your possession, the drop rate of Trust items, Affection items, and Demon Crystals increases by 10%.\n**Notes:** Doesn\'t stack with other drop booster of the same item type. (Unconfirmed.)')
			pages.push(julia)
		}
		else if (drop == "spirit" || drop == "fairy" || drop == "spirits" || drop == "fairies") {
			check = true;
			var seria = new Discord.RichEmbed()
			seria.setTitle('Seria')
			seria.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/6/64/Seria_Icon.png/revision/latest?cb=20180522223013')
			seria.setColor('WHITE')
			seria.addField('Pre-AW Ability', 'While in your possession, the drop rate of Spirits increases by 5%.')
			seria.addField('AW Ability', 'While in your possession, the drop rate of Spirits increases by 6%.')
			pages.push(seria)
		}
		else if (drop == "armor" || drop == "armors" || drop == "tincan" || drop == "goldcan" || drop == "platcan") {
			check = true;
			var amanda = new Discord.RichEmbed()
			amanda.setTitle('Amanda')
			amanda.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/f/f9/Amanda_Icon.png/revision/latest?cb=20180522205700')
			amanda.setColor([95, 64, 0])
			amanda.addField('Pre-AW Ability', 'While in your possession, the drop rate of Gold Armors and Platinum Armors increases by 6%.')
			amanda.addField('AW Ability', 'While in your possession, the drop rate of Gold Armors and Platinum Armors increases by 9%.')
			pages.push(amanda)
			var camanda = new Discord.RichEmbed()
			camanda.setTitle('Chibi Amanda')
			camanda.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/9/9c/Chibi_Amanda_Icon.png/revision/latest?cb=20190207071753')
			camanda.setColor('GOLD')
			camanda.addField('Ability', 'While in your possession, the drop rate of Gold Armors and Platinum Armors increases by 6%.')
			pages.push(camanda)
		}
		else if (drop == "silver" || drop == "silver unit" || drop == "silver units") {
			check = true;
			var junon = new Discord.RichEmbed()
			junon.setTitle('Junon')
			junon.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/e/e2/Junon_Icon.png/revision/latest?cb=20180522220158')
			junon.setColor('WHITE')
			junon.addField('Pre-AW Ability', 'While in your possession, with the exception of Spirits, the drop rate of Silver units increases by 6%.')
			junon.addField('AW Ability', 'While in your possession, with the exception of Spirits, the drop rate of Silver units increases by 8%.')
			pages.push(junon)
		}
		else {message.channel.send("No Data")}
		if (check) {
			var embed = new Discord.RichEmbed()
			embed = pages[page-1]
			if (pages.length > 1) {
				embed = embed + 'Page ' + page + ' of ' + pages.length + '```';
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
							embed = embed + 'Page ' + page + ' of ' + pages.length + '```';
							msg.edit(embed)
						})

						forwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
							if (page === pages.length) return;
							page++;
							embed = pages[page-1];
							embed = embed + 'Page ' + page + ' of ' + pages.length + '```';
							msg.edit(embed)
						})
					})
				})
			}
			else {message.channel.send(embed)}
		}
	}
}

 module.exports = FindDrop;
