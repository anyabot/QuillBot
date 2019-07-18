const commando = require('discord.js-commando');
const Discord = require('discord.js');
var aff = require('../../library/aff.js').aff;

class FindAff extends commando.Command {
    	constructor(client) {
        	super(client, {
            		name: 'aff',
            		group: 'find',
            		memberName: 'aff',
            		description: 'find aff stats of an unit',
			args: [
				{
				key: 'unit',
				prompt: 'Which unit do you want to check affection bonus',
				type: 'string'
				}
			]
        	});
    	}
  
	async run(message, { unit }) {
        	var name = unit.toLowerCase();
		if (aff[name]) {
			const embed = new Discord.RichEmbed()
			.setTitle(aff[name].name)
			.setThumbnail(aff[name].icon)
			.addField("1st Affection Stat", aff[name].aff.a1, true)
			.addField("2nd Affection Stat", aff[name].aff.a2, true)
			.addField("150 Affection Stat", aff[name].aff.a3, true)
			message.channel.send({embed});
		}
		else {message.channel.send("No Data")};
   	 }
}

module.exports = FindAff;
