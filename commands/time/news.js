const commando = require('discord.js-commando');
const Discord = require('discord.js');
var moment = require('moment')
const humanizeDuration = require('humanize-duration')
require('@gouch/to-title-case')

class TTime extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'news',
			aliases: ['pnw', 'patchnotewhen', 'pugnotewhen'],
			group: 'time',
			memberName: 'news',
			description: 'time until regular news announcement',
			examples: ['~news'],
		});
	}

	async run(message, input) {

		var daynum = {
			"Mon": 1,
			"Tue": 7,
			"Wed": 6,
			"Thu": 5,
			"Fri": 4,
			"Sat": 3,
			"Sun": 2,
		}
		var daynum2 = {
			"Mon": 2,
			"Tue": 1,
			"Wed": 7,
			"Thu": 6,
			"Fri": 5,
			"Sat": 4,
			"Sun": 3,
		}

		var now = new Date()
		var m = moment(now).add(9, 'hours')
		var mm = m.format('ddd MMM DD YYYY HH mm ss')
		var words = mm.split(' ')
		var date = words[0]
		var month = words[1]
		var day = words[2]
		var year = words[3]
		var hour = words[4]
		var min = words[5]
		var sec = words[6]
		var ms = moment(year + " " + month + " " + day + " 12:00:00", 'YYYY MMM DD HH:mm:ss')
		if (date == "Tue") {
			if (m.isBefore(ms)) {
				var dif3 = ms.diff(m)
				var diff3 = humanizeDuration(dif3, { round: true })
			}
			else {
				ms = ms.add(7, 'days')
				var dif3 = ms.diff(m)
				var diff3 = humanizeDuration(dif3, { round: true })
			}
		}
		else {
			ms = ms.add(daynum[date], 'days')
			var dif3 = ms.diff(m)
			var diff3 = humanizeDuration(dif3, { round: true })
		}
		var ms = moment(year + " " + month + " " + day + " 15:00:00", 'YYYY MMM DD HH:mm:ss')
		if (date == "Wed") {
			if (m.isBefore(ms)) {
				var dif4 = ms.diff(m)
				var diff4 = humanizeDuration(dif4, { round: true })
			}
			else {
				ms = ms.add(7, 'days')
				var dif4 = ms.diff(m)
				var diff4 = humanizeDuration(dif4, { round: true })
			}
		}
		else {
			ms = ms.add(daynum2[date], 'days')
			var dif4 = ms.diff(m)
			var diff4 = humanizeDuration(dif4, { round: true })
		}
		var embed = new Discord.RichEmbed()
		embed.setColor('RANDOM')
		embed.addField("Next Tuesday Announcement", diff3)
		embed.addField("Next Wednesday Announcement", diff4)
		message.channel.send(embed)
	}
}




module.exports = TTime;
