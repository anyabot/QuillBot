const commando = require('discord.js-commando');
const Discord = require('discord.js');
var moment = require('moment');
var printf = require('printf');

class FindOrb extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'orb',
            	group: 'util2',
            	memberName: 'orb',
            	description: 'find orb farm day',
		examples: ['&prince'],
		args: [{
		    key: 'text',
			prompt: 'What AW Prince do you want to know about?',
		    type: 'string',
		default: "all"
		}]
        });
    }
	async run(message, { text }) {
		var orb = text.toLowerCase()
		if (orb == "all"){
			var now = new Date()
			var m = moment(now).add(9, 'hours')
			var mm = m.format('ddd MMM DD YYYY HH mm ss')
			var words = mm.split(' ')
			var date = words[0]
			var tday;
			let line;
			var ms = "```|————————————————————————————————————————————————————————————————————————————————|\n"
			if (date == "Mon") {tday = "(Today)"}
			else {tday = " "}
			line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           |——————————————————————|——————————————————————|——————————————————————|\n|%-10s | %-20s | %-20s | %-20s |"," Monday", "Sniper", "Dark Knight", "Priest", tday, "Rearguard Strategist", "Heavy Gunner", " ")
			ms = ms + line + "\n|————————————————————————————————————————————————————————————————————————————————|"
			if (date == "Tue") {tday = "(Today)"}
			else {tday = " "}
			line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           |——————————————————————|——————————————————————|——————————————————————|\n|%-10s | %-20s | %-20s | %-20s |"," Tuesday", "Unicorn Knight", "Pegasus Knight", "Master Monk", tday, "Berserker", "Feng Shui Master", " ")
			ms = ms + line + "\n|————————————————————————————————————————————————————————————————————————————————|"
			if (date == "Wed") {tday = "(Today)"}
			else {tday = " "}
			line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           |——————————————————————|——————————————————————|——————————————————————|\n|%-10s | %-20s | %-20s | %-20s |"," Wednesday", "Soldier Chief", "Assassin", "Captain", tday, "High Shaman", "High Bishop", " ")
			ms = ms + line + "\n|————————————————————————————————————————————————————————————————————————————————|"
			if (date == "Thu") {tday = "(Today)"}
			else {tday = " "}
			line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           |——————————————————————|——————————————————————|——————————————————————|\n|%-10s | %-20s | %-20s | %-20s |"," Thursday", "Battle Master", "Samurai Master", "Rune Fencer", tday, "Vampire Killer", "Sailor Chief", " ")
			ms = ms + line + "\n|————————————————————————————————————————————————————————————————————————————————|"
			if (date == "Fri") {tday = "(Today)"}
			else {tday = " "}
			line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           |——————————————————————|——————————————————————|——————————————————————|\n|%-10s | %-20s | %-20s | %-20s |"," Friday", "Lord Witch", "Warlock", "Vanguard Strategist", tday, "Ninja Master", "Arch Angel", " ")
			ms = ms + line + "\n|————————————————————————————————————————————————————————————————————————————————|"
			if (date == "Sat") {tday = "(Today)"}
			else {tday = " "}
			line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           |——————————————————————|——————————————————————|——————————————————————|\n|%-10s | %-20s | %-20s | %-20s |"," Saturday", "Battle Mage", "High Ranger", "Top Dancer", tday, "Dragon Knight", "Priest Warrior Leader", " ")
			ms = ms + line + "\n|————————————————————————————————————————————————————————————————————————————————|"
			if (date == "Sun") {tday = "(Today)"}
			else {tday = " "}
			line = printf("|%-10s | %-20s | %-20s | %-20s |\n|           |——————————————————————|——————————————————————|——————————————————————|\n|%-10s | %-20s | %-20s | %-20s |"," Sunday", "High Alchemist", "Witch Doctor", "Machinist", tday, "Master Thief", "Bowrider Chief", " ")
			ms = ms + line + "\n|————————————————————————————————————————————————————————————————————————————————|"
			ms = ms + "```"
			message.channel.send(ms)
		}
	}
}

 module.exports = FindOrb;
