const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')


class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'credit',
            	group: 'roll2',
              aliases: ['sc'],
            	memberName: 'credit',
            	description: 'get free 2 sc for the gacha stimulator once every 30 mins',
		throttling: {
		usages: 1,
		duration: 3600
	},
		examples: ['&credit']
        });
    }

    async run(message, input) {
		  const user = new Keyv(process.env.MONGODB_URI, { namespace: 'user' });
	    user.on('error', err => console.error('Keyv connection error:', err));
      var uuser = await user.get(message.author.id)
      if (uuser == undefined) {uuser = [150, 10, 33]}
	    var usc = uuser[0]
	    var ge = 2
      usc = usc + ge;
	    uuser[0] = usc
	user.set(message.author.id, uuser)
      message.reply("You got " + ge + " SC\nYou curently have " + usc + " SC")
				
	}
}
module.exports = RanRoll;
