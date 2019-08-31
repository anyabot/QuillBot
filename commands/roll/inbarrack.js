const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
var functions = require('../../functions.js');


class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'inbarrack',
              aliases: ['inbarracks'],
            	group: 'roll3',
            	memberName: 'inbarrack',
            	description: 'check how many copies of an unit is in your barrack',
              args: [{
		    key: 'text',
			prompt: 'Which unit do you want to check?',
		    type: 'string'
		}],
		examples: ['&take 1']
        });
    }

    async run(message, { text }) {
		const lastroll = new Keyv(process.env.MONGODB_URI, { namespace: 'lastroll' });
	    lastroll.on('error', err => console.error('Keyv connection error:', err));
		const barrack = new Keyv(process.env.MONGODB_URI, { namespace: 'barrack' });
	    barrack.on('error', err => console.error('Keyv connection error:', err));
		var ulastroll = await lastroll.get(message.author.id)
		if (ulastroll == undefined) {ulastroll = []}
		var ubarrack = await barrack.get(message.author.id)
		if (ubarrack == undefined) {ubarrack = []}
		var unit = functions.nameChange(text)
		var nu = 0;
		for (var i = 0; i < ubarrack.length; i++) {
			if (unit = ubarrack[i]) {nu++}
		}
		message.reply("You have " + nu + " " + unit + " in your barrack.")
	}
}
module.exports = RanRoll;
