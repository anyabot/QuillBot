const commando = require('discord.js-commando');
const Discord = require('discord.js');

class FindDrop extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'goldboost',
			aliases: ['gb', 'goldbooster'],
			group: 'util2',
			memberName: 'goldboost',
			description: 'show units with gold boost ability',
			examples: ['&goldboost gold get'],
			args: [{
				key: 'text',
				prompt: 'What types of goldbooster do you want to know about?',
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
		if (drop == "all") {
			check = true;
			var saval = new Discord.RichEmbed()
			saval.setTitle('Saval')
			saval.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/4/41/Saval_Icon.png/revision/latest?cb=20180522223009')
			saval.setColor([95, 64, 0])
			saval.addField('AW Ability', 'While on the active team, all allies with Gold Get! gain additional gold per activation.\n**Notes:**\n120G per activation added to gold earned from a mission.\nReplaces 100G Gold Get! procs.\nIs overridden by Gold Get Plus.')
			pages.push(saval)
			var totono = new Discord.RichEmbed()
			totono.setTitle('Totono')
			totono.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/8/82/Totono_Icon.png/revision/latest?cb=20180522223817')
			totono.setColor('WHITE')
			totono.addField('AW Ability', 'While on the active team, all allies with Gold Get! gain additional gold per activation.\n**Notes:**\n130G per activation added to gold earned from a mission.\nReplaces 100G Gold Get! procs.\nOverrides Golden Mimic.')
			pages.push(totono)
			var leeanne = new Discord.RichEmbed()
			leeanne.setTitle('Leeanne (New Year\'s)')
			leeanne.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/9/9d/Leeanne_%28New_Year%27s%29_Icon.png/revision/latest?cb=20180522220609')
			leeanne.setColor('GOLD')
			leeanne.addField('AW Ability', 'On mission clear, awarded Gold is increased by 7%.')
			pages.push(leeanne)
			var noel = new Discord.RichEmbed()
			noel.setTitle('Noel')
			noel.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/1/1e/Noel_Icon.png/revision/latest?cb=20180522221722')
			noel.setColor('GOLD')
			noel.addField('AW Ability', 'On mission clear, awarded Gold increases by 10%.')
			pages.push(noel)
			var mia = new Discord.RichEmbed()
			mia.setTitle('Mia')
			mia.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/e/e8/Mia_Icon.png/revision/latest?cb=20180522221351')
			mia.setColor('WHITE')
			mia.addField('AW Ability', 'On mission clear, awarded Gold increases by 15%.')
			pages.push(mia)
			var diera = new Discord.RichEmbed()
			diera.setTitle('Diera')
			diera.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/5/55/Diera_Icon.png/revision/latest?cb=20180522212444')
			diera.setColor([95, 64, 0])
			diera.addField('Pre-AW Ability', 'On mission clear, awarded Gold increases by 18%.')
			diera.addField('AW Ability', 'On mission clear, awarded Gold increases by 20%.')
			pages.push(diera)
			var cdiera = new Discord.RichEmbed()
			cdiera.setTitle('Chibi Diera')
			cdiera.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/5/55/Diera_Icon.png/revision/latest/')
			cdiera.setColor('GOLD')
			cdiera.addField('Ability', 'On mission clear, awarded Gold increases by 18%.')
			pages.push(cdiera)
		}
		else if (drop == "gg" || drop == "gold get") {
			check = true;
			var saval = new Discord.RichEmbed()
			saval.setTitle('Saval')
			saval.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/4/41/Saval_Icon.png/revision/latest?cb=20180522223009')
			saval.setColor([95, 64, 0])
			saval.addField('AW Ability', 'While on the active team, all allies with Gold Get! gain additional gold per activation.\n**Notes:**\n120G per activation added to gold earned from a mission.\nReplaces 100G Gold Get! procs.\nIs overridden by Gold Get Plus.')
			pages.push(saval)
			var totono = new Discord.RichEmbed()
			totono.setTitle('Totono')
			totono.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/8/82/Totono_Icon.png/revision/latest?cb=20180522223817')
			totono.setColor('WHITE')
			totono.addField('AW Ability', 'While on the active team, all allies with Gold Get! gain additional gold per activation.\n**Notes:**\n130G per activation added to gold earned from a mission.\nReplaces 100G Gold Get! procs.\nOverrides Golden Mimic.')
			pages.push(totono)
		}
		else if (drop == "mission" || drop == "clear" || drop == "mission clear") {
			check = true;
			var leeanne = new Discord.RichEmbed()
			leeanne.setTitle('Leeanne (New Year\'s)')
			leeanne.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/9/9d/Leeanne_%28New_Year%27s%29_Icon.png/revision/latest?cb=20180522220609')
			leeanne.setColor('GOLD')
			leeanne.addField('AW Ability', 'On mission clear, awarded Gold is increased by 7%.')
			pages.push(leeanne)
			var noel = new Discord.RichEmbed()
			noel.setTitle('Noel')
			noel.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/1/1e/Noel_Icon.png/revision/latest?cb=20180522221722')
			noel.setColor('GOLD')
			noel.addField('AW Ability', 'On mission clear, awarded Gold increases by 10%.')
			pages.push(noel)
			var mia = new Discord.RichEmbed()
			mia.setTitle('Mia')
			mia.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/e/e8/Mia_Icon.png/revision/latest?cb=20180522221351')
			mia.setColor('WHITE')
			mia.addField('AW Ability', 'On mission clear, awarded Gold increases by 15%.')
			pages.push(mia)
			var diera = new Discord.RichEmbed()
			diera.setTitle('Diera')
			diera.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/5/55/Diera_Icon.png/revision/latest?cb=20180522212444')
			diera.setColor([95, 64, 0])
			diera.addField('Pre-AW Ability', 'On mission clear, awarded Gold increases by 18%.')
			diera.addField('AW Ability', 'On mission clear, awarded Gold increases by 20%.')
			pages.push(diera)
			var cdiera = new Discord.RichEmbed()
			cdiera.setTitle('Chibi Diera')
			cdiera.setThumbnail('https://vignette.wikia.nocookie.net/aigis/images/5/55/Diera_Icon.png/revision/latest/')
			cdiera.setColor('GOLD')
			cdiera.addField('Ability', 'On mission clear, awarded Gold increases by 18%.')
			pages.push(cdiera)
		}
		else { message.channel.send("No Data") }
		if (check) {
			var embed = new Discord.RichEmbed()
			embed = pages[page - 1]
			if (pages.length > 1) {
				embed.setFooter('Page ' + page + ' of ' + pages.length);
				message.channel.send(embed).then(msg => {

					msg.react('⬅').then(r => {
						msg.react('➡')

						// Filters
						const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && !user.bot;
						const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && !user.bot;

						const backwards = msg.createReactionCollector(backwardsFilter, { timer: 6000 });
						const forwards = msg.createReactionCollector(forwardsFilter, { timer: 6000 });

						backwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
							if (page === 1) return;
							page--;
							embed = pages[page - 1];
							embed.setFooter('Page ' + page + ' of ' + pages.length);
							msg.edit(embed)
						})

						forwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
							if (page === pages.length) return;
							page++;
							embed = pages[page - 1];
							embed.setFooter('Page ' + page + ' of ' + pages.length);
							msg.edit(embed)
						})
					})
				})
			}
			else { message.channel.send(embed) }
		}
	}
}

module.exports = FindDrop;
