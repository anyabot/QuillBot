const commando = require('discord.js-commando');
const bot = new commando.CommandoClient({
    commandPrefix: '&',
    owner: '371341098854907939',
    disableEveryone: true
});
bot.on('ready', () => {
    bot.user.setActivity('Prefix:& | &help to view commands');
});
bot.on('message', message => {
    if(message.channel.name != undefined)  {
        if (message.member.roles.find(role => role.name === "Silvers")) {}
        else {message.member.addRole(message.guild.roles.find(role => role.name === "Silvers"))}
    }
});
bot.registry.registerGroup('find', 'Find');
bot.registry.registerGroup('util2', 'Util')
bot.registry.registerGroup('time', 'Time')
bot.registry.registerGroup('roll', 'Mini Game: Rolling')
bot.registry.registerGroup('roll2', 'Mini Game: SC')
bot.registry.registerGroup('roll3', 'Mini Game: Barrack')
bot.registry.registerGroup('roll4', 'Mini Game: Waifu')
bot.registry.registerGroup('team', 'Mini Game: Team')
bot.registry.registerGroup('quiz', 'Mini Game: Quiz')
bot.registry.registerGroup('link', 'Link')
bot.registry.registerGroup('list', 'List')
bot.registry.registerDefaultCommands({
  unknownCommand: false
});
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.login(process.env.BOT_TOKEN);
