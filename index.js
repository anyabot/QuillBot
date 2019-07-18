const { commando } = require('discord.js-commando');
const client = new CommandoClient();

    client.registry.registerDefaultTypes()
    client.registry.registerGroups('find', 'Find')
    client.registry.registerDefaultGroups()
    client.registry.registerDefaultCommands()
    client.registry.registerCommandsIn(__dirname + "/commands");


client.login(process.env.BOT_TOKEN);
