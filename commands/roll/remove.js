const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'remove',
            	group: 'roll',
            	memberName: 'remove',
            	description: 'remove a unit from the barrack',
              args: [{
		    key: 'ind',
			prompt: 'Which unit do you want to remove? (Input the index number from &barrack to remove)',
		    type: 'integer'
		}],
		examples: ['&remove']
        });
    }

    async run(message, { ind }) {
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ubarrack = await barrack.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
	    if (ubarrack == [] || ubarrack == null || ubarrack.length == 0) {
			message.reply("You have no unit in the barrack")
		} 
		else if (ind < 1 || ind > ubarrack.length) {message.reply("Wrong Index")}
		else {
		var unit = ubarrack[ind-1]
			const collector = new Discord.MessageCollector(message.channel, msg => msg.author.id === message.author.id, { time: 6000 });
			var mes = "Do you want to remove " + unit + " from your barrack? (y/n)"
			message.reply(mes)
			collector.on('collect', msg => {
				var re = msg.content.toLowerCase()
				if (re == "y") {
					message.reply("You removed " + ubarrack[ind - 1] + " from your barrack")
					for (var i = ind - 1 ; i < ubarrack.length - 1; i++) {
						ubarrack[i] = ubarrack[i+1]
					}
					ubarrack.pop()
					barrack.set(message.author.id, ubarrack)
					collector.stop()
						
				}
				else if (re == "n") {
					collector.stop()
				}
				else {
					message.reply("Wrong Input")
				}
			})
		}
	}
}
module.exports = RanRoll;
