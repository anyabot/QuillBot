const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'switch',
            	group: 'roll3',
            	memberName: 'switch',
		aliases: ['swap'],
            	description: 'switch place of 2 units in the barrack',
              args: [{
		    key: 'ind1',
			prompt: 'The first unit you want to switch place? (Input the index number from &barrack)',
		    type: 'integer'
		},
      {
		    key: 'ind2',
			prompt: 'The second unit you want to switch place? (Input the index number from &barrack)',
		    type: 'integer'
		}
    ],
		examples: ['&switch']
        });
    }

    async run(message, { ind1 , ind2 }) {
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ubarrack = await barrack.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
	    if (ubarrack == [] || ubarrack == null || ubarrack.length == 0) {
			message.reply("You have no unit in the barrack")
		} 
		else if (ind1 < 1 || ind1 > ubarrack.length) {message.reply("Wrong First Unit Index")}
    else if (ind2 < 1 || ind2 > ubarrack.length) {message.reply("Wrong Second  Unit Index")}
    else if (ind1 == ind2) {"Same Index"}
		else {
		var unit1 = ubarrack[ind1-1]
    var unit2 = ubarrack[ind2-1]
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
              ubarrack[ind1-1] = unit2
              ubarrack[ind2-1] = temp
						barrack.set(message.author.id, ubarrack)
						}
					})
				})
			})
		}
	}
}
module.exports = RanRoll;
