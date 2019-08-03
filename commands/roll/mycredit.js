const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'mycredit',
            	group: 'roll',
              aliases: ['mysc'],
            	memberName: 'mycredit',
            	description: 'check the number of sc you have',
		examples: ['&mycredit']
        });
    }

    async run(message, input) {
		  const user = new Keyv(process.env.MONGODB_URI, { namespace: 'user' });
	    user.on('error', err => console.error('Keyv connection error:', err));
      var uuser = await user.get(message.author.id)
      if (uuser == undefined) {uuser = [0, 10, 33]}
	    var usc = uuser[0]
      message.reply("You curently have " + usc + " SC")
				
	}
}
module.exports = RanRoll;
