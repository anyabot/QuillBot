const commando = require('discord.js-commando');
const Discord = require('discord.js');
var unitstat = require('../../library/unitstat.js').unitstat;

class FindAff extends commando.Command {
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
			.setTitle(unitstat[name].name)
			.setThumbnail(unitstat[name].icon)
      unitstat[name].stat.forEach( function(class) {
      .addField(stat[name].stat.class.name, "**HP: **" + stat[name].stat.class.hp + "\n**ATK: **"  + stat[name].stat.class.atk + "\n**DEF: **" + stat[name].stat.class.def + "\n**MR: **" + stat[name].stat.class.mr + "\n**Block: **" + stat[name].stat.class.block + "\n**Range: **" + stat[name].stat.class.range + "\n**Range (Skill): **" + stat[name].stat.class.rangeskill + "\n**Range (SAW): **" + stat[name].stat.class.rangesaw + "\n**Max Cost: **" + stat[name].stat.class.costmax + "\n**Min Cost: **"+ stat[name].stat.class.costmin)
      }
			embed.addField("1st Affection Stat", aff[name].aff.a1, true)
			message.channel.send({embed});
		}
		else {message.channel.send("No Data")};
   	 }
}

module.exports = FindAff;
