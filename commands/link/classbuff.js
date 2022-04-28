const commando = require('discord.js-commando');
const Discord = require('discord.js');

class UtilBuff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'classbuff',
            aliases: ['cb', 'factionbuff', 'fb'],
            group: 'link',
            memberName: 'classbuff',
            description: 'link to wiki class and faction boosting abilities',
            examples: ['&classbuff'],
        });
    }

    async run(message, input) {
        message.channel.send('https://aigis.fandom.com/wiki/Class_and_Faction_Boosting_Abilities')
    }
}
module.exports = UtilBuff;
