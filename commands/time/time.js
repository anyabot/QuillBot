const commando = require('discord.js-commando');
const Discord = require('discord.js');
var moment = require('moment')
const humanizeDuration = require('humanize-duration')
require('@gouch/to-title-case')

class TTime extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'time',
            group: 'time',
            memberName: 'time',
            description: 'time until several in-game resets',
		examples: ['~time'],
        });
    }

    async run(message, input) {

		var daynum = {
		  "Mon": 3,
		  "Tue": 2,
		  "Wed": 1,
		  "Thu": 0,
		  "Fri": 6,
		  "Sat": 5,
		  "Sun": 4,
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
		var m2 = moment(year + " " +  month + " " + day, 'YYYY MMM DD').add(1, 'days')
		var mm2 = m2.toString()
		var dif1 = m2.diff(m)
		var diff1 = humanizeDuration(dif1, { round: true })
		var m3 = moment(year + " " +  month + " " + day +" 04:00:00", 'YYYY MMM DD HH:mm:ss')
		if (m3.isBefore(m)) {m3 = m3.add(1, 'days')}
		var dif2 = m3.diff(m)
		var diff2 = humanizeDuration(dif2, { round: true })
		var mai = false;
		var ms = moment(year + " " +  month + " " + day +" 11:00:00", 'YYYY MMM DD HH:mm:ss')
		var me = moment(year + " " +  month + " " + day +" 15:00:00", 'YYYY MMM DD HH:mm:ss')
		if (date == "Thu") {
			if (m.isBefore(ms)) {
				var dif3 = ms.diff(m)
				var diff3 = humanizeDuration(dif3, { round: true })
			}
			else if (m.isBefore(me)) {
				mai = true;
				var dif3 = me.diff(m)
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
		var m4 = moment(year + " " +  month + " " + "01" +" 04:00:00", 'YYYY MMM DD HH:mm:ss')
		if (m.isBefore(m4)) {
			var dif4 = m4.diff(m)
			var diff4 = humanizeDuration(dif4, { round: true })
		}
		else {
			m4 = m4.add(1, 'months')
			var dif4 = m4.diff(m)
			var diff4 = humanizeDuration(dif4, { round: true })
		}
		var mm4 = m4.format('ddd MMM DD YYYY HH mm ss')
		var words4 = mm4.split(' ')
		var date4 = words4[0]
		var m5 = m4.add(daynum[date4], 'days')
		if (m.isBefore(m5)) {
			var dif5 = m5.diff(m)
			var diff5 = humanizeDuration(dif5, { round: true })
		}
		else {
			m5 = m5.add(1, 'months')
			var dif5 = m5.diff(m)
			var diff5 = humanizeDuration(dif5, { round: true })
		}
		var embed = new Discord.RichEmbed()
		embed.setColor('RANDOM')
		embed.addField("Daily Missions, Daily Revivals Change", diff1)
		embed.addField("Daily Fame Quest, Stamp Card Change", diff2)
		embed.addField("Trading Post, Stamp Card Reset", diff4)
		embed.addField("Fame Reset", diff5)
		if (mai) {
		  embed.addField('Maintenance End', diff3)
		}
		else {
		  embed.addField('Maintenance Start', diff3)
		}
    message.channel.send(embed)
	}
}




module.exports = TTime;
