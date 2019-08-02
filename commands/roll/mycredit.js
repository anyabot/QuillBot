const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')



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
		  const sc = new Keyv(process.env.CLEARDB_DATABASE_URL, { namespace: 'sc' });
      var usc = await sc.get(message.author.id)
      if (usc == undefined) {usc = 0}
      message.reply("You curently have " + usc + " SC")
				
	}
}
module.exports = RanRoll;
