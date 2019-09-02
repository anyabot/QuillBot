const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'teamswitch',
            	group: 'team',
            	memberName: 'teamswitch',
		aliases: ['teamswap'],
            	description: 'switch place of 2 units in the your main team',
              args: [{
		    key: 'ind1',
			prompt: 'The first unit you want to switch place?',
		    type: 'integer'
		},
      {
		    key: 'ind2',
			prompt: 'The second unit you want to switch place?',
		    type: 'integer'
		}
    ],
		examples: ['&teamswitch 1 2']
        });
    }

    async run(message, { ind1 , ind2 }) {
	    const team = new Keyv(process.env.MONGODB_URI, { namespace: 'team' });
		team.on('error', err => console.error('Keyv connection error:', err));
		var uteam = await team.get(message.author.id)
		if (uteam == undefined) {uteam = {}}
		const mainteam = new Keyv(process.env.MONGODB_URI, { namespace: 'mainteam' });
		mainteam.on('error', err => console.error('Keyv connection error:', err));
		var teamname = await mainteam.get(message.author.id)
		if (teamname == undefined) {message.channel.send("You haven't set your main team")}
		else if (uteam[teamname]["name"].length == 0) {message.channel.send("You no unit in your main team")}
		else if (ind1 < 1 || ind1 > uteam[teamname]["name"].length) {message.reply("Wrong First Unit Index")}
		else if (ind2 < 1 || ind2 > uteam[teamname]["name"]) {message.reply("Wrong Second  Unit Index")}
		else if (ind1 == ind2) {"Same Index"}
		else {
			var unit1 = uteam[teamname]["name"][ind1-1]
			var unit2 = uteam[teamname]["name"][ind2-1]
			var mes = "Do you want to switch " + unit1 + " and " + unit2 + "? (y/n)"
			message.channel.send(mes).then(msg => {

				msg.react('🇾').then( r => {
					msg.react('🇳')

					// Filters
					const backwardsFilter = (reaction, user) => (reaction.emoji.name === '🇾' || reaction.emoji.name === '🇳') && user.id === message.author.id;

					const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000 , max: 1});

					backwards.on('collect', r => {
						r.remove(r.users.filter(u => !u.bot).first());
							if (r.emoji.name === "🇳") {
							msg.edit("Cancelled")
						}
						else if (r.emoji.name === "🇾") {
							msg.edit("You switched " + unit1 + " and " + unit2)
							var temp = unit1
							uteam[teamname]["name"][ind1-1] = unit2
							uteam[teamname]["name"][ind2-1] = temp
							temp = uteam[teamname]["link"][ind1-1]
							uteam[teamname]["link"][ind1-1] = uteam[teamname]["link"][ind2-1]
							uteam[teamname]["link"][ind2-1] = temp
							temp = uteam[teamname]["state"][ind1-1]
							uteam[teamname]["state"][ind1-1] = uteam[teamname]["state"][ind2-1]
							uteam[teamname]["state"][ind2-1] = temp
							temp = uteam[teamname]["saw"][ind1-1]
							uteam[teamname]["saw"][ind1-1] = uteam[teamname]["saw"][ind2-1]
							uteam[teamname]["saw"][ind2-1] = temp
							team.set(message.author.id, uteam)
						}
					})
				})
			})
		}
	}
}
module.exports = RanRoll;
