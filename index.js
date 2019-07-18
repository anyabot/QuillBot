const { commando } = require('discord.js-commando');
const client = new CommandoClient({
    commandPrefix: '!',
    owner: '371341098854907939',
    disableEveryone: true
});

    client.registry.registerDefaultTypes()
    client.registry.registerGroups('find', 'Find')
    client.registry.registerDefaultGroups()
    client.registry.registerDefaultCommands()
    client.registry.registerCommandsIn(__dirname + "/commands");

client.on('ready', () => {
    console.log('Logged in!');
    client.user.setActivity('game');
});

client.login(process.env.BOT_TOKEN);
