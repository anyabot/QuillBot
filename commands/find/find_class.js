const commando = require('discord.js-commando');
const Discord = require('discord.js');
var unitclass = require('../../library/unitclass.json');

class FindClass extends commando.Command {
    	constructor(client) {
        	super(client, {
            		name: 'class',
            		group: 'find',
            		memberName: 'class',
            		description: 'find description of a class',
			args: [
				{
				key: 'class',
				prompt: 'Which class do you want to check?',
				type: 'string'
				}
			]
        	});
    	}
  
	async run(message, { class }) {
        	var name = class.toLowerCase();
		if (unitclass[name]) {
			let classname = unitclass[name];
			if (classname["base"]) {
				const embed = new Discord.RichEmbed()
				embed.setTitle(classname.base.name)
				embed.addField("Description", classname.base.des, true)
				embed.addField("Note", classname.base.note, true)
				message.channel.send({embed});
			}
			if (classname["cc"]) {
				const embed2 = new Discord.RichEmbed()
				embed2.setTitle(classname.cc.name)
				embed2.addField("Description", classname.cc.des, true)
				embed2.addField("Note", classname.cc.note, true)
				message.channel.send({embed2});
			}
			if (classname["aw"]){
				const embed3 = new Discord.RichEmbed()
				embed3.setTitle(classname.aw.name)
				embed3.addField("Description", classname.aw.des, true)
				embed3.addField("Note", classname.aw.note, true)
				message.channel.send({embed3});
			}
			if (classname["aw2v1"]) {
				const embed4 = new Discord.RichEmbed()
				embed4.setTitle(classname.aw2v1.name)
				embed4.addField("Description", classname.aw2v1.des, true)
				embed4.addField("Note", classname.aw2v1.note, true)
				message.channel.send({embed4});
			}
			if (classname["aw2v2"]) {
				const embed5 = new Discord.RichEmbed()
				embed5.setTitle(classname.aw2v2.name)
				embed5.addField("Description", classname.aw2v2.des, true)
				embed5.addField("Note", classname.aw2v2.note, true)
				message.channel.send({embed5});
			}
		}
		else {message.channel.send("No Data")};
   	}
}

module.exports = FindClass;
