const commando = require('discord.js-commando');
const Discord = require('discord.js');
var fs = require('fs');
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
		    type: 'string',
		default: "all"
		}]
        });
    }
	async run(message, { text }) {
		var tr = text.toLowerCase()
		var path = '/../../trait/'
		fs.stat(path, (err, stats) => {
			if ( !stats.isFile(tr) ) {
				var list = require(path + tr).list
				message.channel.send(list.join("\n"))
			}  
			else {
				message.channel.send("No Data")
			}
		})
	}
}
module.exports = Trait;
