const commando = require('discord.js-commando');
var aff = require('../../library/aff.js').aff;

class FindAff extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'aff',
            group: 'find',
            memberName: 'aff',
            description: 'find aff stats of an unit'
			args: [
				{
				key: 'unit',
				prompt: 'Which unit do you want to check affection bonus',
				type: 'string'
				}
			]
        });
    }
  
	async run(message, unit) {
        var name = unit.toLowerCase();
		if (aff[name]) {
			a1 = aff[name].aff.a1;
			a2 = aff[name].aff.a2;
			a3 = aff[name].aff.a3;
			const embed = new Discord.RichEmbed()
			.setTitle(aff[name].name)
			.setThumbnail(aff[name].icon)
			.addField("1st Affection Stat", a1, true)
			.addField("2nd Affection Stat", a2, true)
			.addField("150 Affection Stat", a3, true)
			message.channel.send({embed});
		}
		else {message.channel.send("No Data")};
    }
    function toTitleCase(str) {
    return str.replace(/\w+('s)?/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = FindAff;
