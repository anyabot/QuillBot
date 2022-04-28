const commando = require('discord.js-commando');
const Discord = require('discord.js');

class UtilBuff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'implement',
            aliases: ['implementationlog', 'implementlog', 'implementation'],
            group: 'link',
            memberName: 'implement',
            description: 'link to wiki implementation log',
            examples: ['&classbuff'],
        });
    }

    async run(message, input) {
        message.channel.send('https://aigis.fandom.com/wiki/Implementation_Log')
    }
}
module.exports = UtilBuff;
