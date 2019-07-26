const commando = require('discord.js-commando');
const bot = new commando.CommandoClient({
    commandPrefix: '&',
    owner: '371341098854907939',
    disableEveryone: true
});

bot.registry.registerGroup('find', 'Find');
bot.registry.registerGroup('util2', 'Util')
bot.registry.registerGroup('time', 'Time')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(process.env.BOT_TOKEN);
