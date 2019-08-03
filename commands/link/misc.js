const commando = require('discord.js-commando');
const Discord = require('discord.js');

class UtilBuff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'misc',
		aliases: ['miscellaneous'],
            group: 'link',
            memberName: 'misc',
            description: 'link to wiki miscellaneous categorisation',
		examples: ['&classbuff'],
        });
    }

    async run(message, input) {
		message.channel.send('https://aigis.fandom.com/wiki/Miscellaneous_Categorisation')
    }
}
module.exports = UtilBuff;
