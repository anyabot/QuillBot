const commando = require('discord.js-commando');
const Discord = require('discord.js');
class Trait extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'trait',
            	group: 'list',
            	memberName: 'trait',
            	description: 'list all classes/units with a certain trait',
		examples: ['&trait tokenization'],
		args: [{
		    key: 'text',
			prompt: 'What trait do you want to know about?',
		    type: 'string'
		}]
        });
    }
	async run(message, { text }) {
		var tr = text.toLowerCase()
		message.channel.send(tr)
		var path = '/../../trait/' + tr + '.js'
		message.channel.send(path)
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
