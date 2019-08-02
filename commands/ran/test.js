const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mongo')
var MONGODB_URI  = 'mongodb://heroku_z1nnxhdm:j6jsrki6cihje13qtli31qm4aj@ds359077.mlab.com:59077/heroku_z1nnxhdm'



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'credit',
            	group: 'ran',
            	memberName: 'credit',
            	description: 'get free sc for the gacha stimulator once every 30 mins',
		throttling: {
		usages: 2,
		duration: 1800
	},
		examples: ['&credit']
        });
    }

    async run(message, input) {
		  const sc = new Keyv(MONGODB_URI, { namespace: 'sc' });
      var usc = await sc.get(message.author.id)
      if (usc == undefined) {usc = 0}
	    var ge = random.int(5, 10)
      usc = usc + ge;
	sc.set(message.author.id, usc)
      message.reply("You got " + ge + " SC\nYou curently have " + usc + " SC")
				
	}
}
module.exports = RanRoll;
