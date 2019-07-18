const { commando } = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: '!',
    owner: '371341098854907939',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['find', 'Find']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
    client.user.setActivity('game');
});

client.login(process.env.BOT_TOKEN);
