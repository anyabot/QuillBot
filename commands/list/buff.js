const commando = require('discord.js-commando');
const Discord = require('discord.js');
class Trait extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'buff',
			group: 'list',
			memberName: 'buff',
			description: 'list all classes/units with a skill/ability that buff a certain class/faction',
			examples: ['&buff white empire'],
			args: [{
				key: 'text',
				prompt: 'What class/faction do you want to know about?',
				type: 'string'
			}]
		});
	}
	async run(message, { text }) {
		var tr = text.toLowerCase()
		var path = '../../buff/' + tr + '.js'
		if (moduleIsAvailable(path)) {
			var list = require(path).list
			message.channel.send(list.join("\n"))
		}
		else {
			message.channel.send("No Data")
		}
	}
}
function moduleIsAvailable(path) {
	try {
		require.resolve(path);
		return true;
	} catch (e) {
		return false;
	}
}
module.exports = Trait;
