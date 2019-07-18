const commando = require('discord.js-commando');
const Discord = require('discord.js');
var unitstat = require('../../library/unitstat.js').unitstat;

class FindStat extends commando.Command {
    	constructor(client) {
        	super(client, {
            		name: 'stat',
            		group: 'find',
            		memberName: 'stat',
            		description: 'find stats of an unit',
			args: [
				{
				key: 'unit',
				prompt: 'Which unit do you want to check stat',
				type: 'string'
				}
			]
        	});
    	}
  
	async run(message, { unit }) {
        	var name = unit.toLowerCase();
		if (unitstat[name]) {
			const embed = new Discord.RichEmbed()
			embed.setTitle(unitstat[name].name)
			embed.setThumbnail(unitstat[name].icon)
			unitstat[name].stat.forEach( function(class) {
			embed.addField(unitstat[name].stat.class.name, "**HP: **" + unitstat[name].stat.class.hp + "\n**ATK: **"  + unitstat[name].stat.class.atk + "\n**DEF: **" + unitstat[name].stat.class.def + "\n**MR: **" + unitstat[name].stat.class.mr + "\n**Block: **" + unitstat[name].stat.class.block + "\n**Range: **" + unitstat[name].stat.class.range + "\n**Range (Skill): **" + unitstat[name].stat.class.rangeskill + "\n**Range (SAW): **" + unitstat[name].stat.class.rangesaw + "\n**Max Cost: **" + unitstat[name].stat.class.costmax + "\n**Min Cost: **"+ unitstat[name].stat.class.costmin, true)
		}
			embed.addField("1st Affection Stat", unitstat[name].name, true)
			message.channel.send({embed});
		}
		else {message.channel.send("No Data")};
   	 }
}

module.exports = FindStat;
