const commando = require('discord.js-commando');
const Discord = require('discord.js');

class UtilBuff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'uiguide',
            aliases: ['ui'],
            group: 'link',
            memberName: 'uiguide',
            description: 'link to wiki ui guide',
            examples: ['&classbuff'],
        });
    }

    async run(message, input) {
        message.channel.send('https://aigis.fandom.com/wiki/UI_Guide')
    }
}
module.exports = UtilBuff;
