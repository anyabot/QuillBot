const commando = require('discord.js-commando');

module.exports = class UnknownCommandCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'unknown',
			group: 'util',
			memberName: 'unknown',
			description: 'Displays help information for when an unknown command is used.',
			examples: ['unknown-command kickeverybodyever'],
			unknown: true,
			hidden: true
		});
	}

	run(msg) {
  if (msg.channel.type != "dm") {
		return msg.reply(
			`Unknown command. Use ${msg.anyUsage(
				'help',
				msg.guild ? undefined : null,
				msg.guild ? undefined : null
			)} to view the command list.`
		);
    }
	}
};
