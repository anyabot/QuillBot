const commando = require('discord.js-commando');
const Discord = require('discord.js');
const expTable = require('../../library/exp').expTable;

class UtilDaily extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'exp',
            group: 'exp_cal',
            memberName: 'exp',
            description: 'Calculate EXP need to reach from one level to another.',
            examples: ['&exp rarity level_from level_to exp_to_next_level y (if you have Sariette, else skip the last one)'],
			args: [
				{
					key: 'rarity',
					prompt: 'What is the rarity of the unit?',
					type: 'string'
				},
				{
					key: 'level_from',
					prompt: 'What is the current level of the unit?',
					type: 'integer'
				},
				{
					key: 'level_to',
					prompt: 'What is the level you want to get to?',
					type: 'integer'
				},
				{
					key: 'exp_to_next_level',
					prompt: 'What is the EXP needed to reach next level?',
					type: 'integer'
				},
				{
					key: 'sari',
					prompt: 'Do you have Sariette?',
					type: 'string',
					default: 'no'
				}
			]
        });
    }

    async run(message, {rarity, level_from, level_to, exp_to_next_level, sari}) {
		if (!['iron', 'bronze', 'sil', 'silver', 'gold', 'sap', 'sapphire', 'plat', 'platinum', 'black'].includes(rarity))
			message.channel.send("Rarity" + arr[2] + "doesn't exist");
		else if (level_to <= level_from )
			message.channel.send("Level to get to must be higher than current level");
		else if (level_to > 99 )
			message.channel.send("Level to get to must be lower than 100");
        else {
			rarity2 = convert(rarity)
			exp = get_exp(rarity2, level_from, level_to, exp_to_next_level)
			message.channel.send(exp);
		}
	}
}


function convert(rarity) {
	rarity = rarity.toLowerCase()
	switch (rarity) {
		case 'black':
			return 6
			break
		case 'plat':
		case 'platinum':
			return 5
			break
		case 'sap':
		case 'sapphire':
			return 4
			break
		case 'gold':
			return 3
			break
		case 'sil':
		case 'silver':
			return 2
			break
		case 'bronze':
			return 1
			break
		case 'iron':
			return 0
			break
  }
}
function get_exp(rarity, level_from, level_to, exp_to_next_level) {
	let needed = exp_to_next_level
	for (let i = level_from; i < level_to - 1; i++) {
		needed += expTable[rarity][i]
	}
	return needed
}
module.exports = UtilDaily;
