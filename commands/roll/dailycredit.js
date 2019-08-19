const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
var moment = require('moment')
const humanizeDuration = require('humanize-duration')

class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'dailycredit',
            	group: 'roll2',
              aliases: ['dailysc'],
            	memberName: 'dailycredit',
            	description: 'get free 40 - 60 sc for the gacha stimulator once per day (reset at 0:00 GMT+9)',
		examples: ['&dailycredit']
        });
    }

    async run(message, input) {
	    var now = new Date()
		var m = moment(now).add(9, 'hours')
		var mm = m.format('ddd MMM DD YYYY HH mm ss')
		var words = mm.split(' ')
		var date = words[0]
		var month = words[1]
		var day = words[2]
		var year = words[3]
		var uday = []
		uday.push(day)
	    uday.push(month)
	    uday.push(year)
		const dsc = new Keyv(process.env.MONGODB_URI, { namespace: 'dsc' });
	    dsc.on('error', err => console.error('Keyv connection error:', err));
      var ldsc = await dsc.get(message.author.id)
      
		  const user = new Keyv(process.env.MONGODB_URI, { namespace: 'user' });
	    user.on('error', err => console.error('Keyv connection error:', err));
      var uuser = await user.get(message.author.id)
      if (uuser == undefined) {uuser = [150, 10, 33]}
	    var usc = uuser[0]
	    var ge = random.int(40, 60)
	    if (ldsc == undefined) {
		usc = usc + ge
	    	uuser[0] = usc
		user.set(message.author.id, uuser)
		    dsc.set(message.author.id, uday)
      		message.reply("You got " + ge + " SC\nYou curently have " + usc + " SC")
	    }
	    else if (ldsc[0] != uday[0] || ldsc[1] != uday[1] || ldsc[2] != uday[2]) {
		usc = usc + ge
	    	uuser[0] = usc
		user.set(message.author.id, uuser)
		    dsc.set(message.author.id, uday)
      		message.reply("You got " + ge + " SC\nYou curently have " + usc + " SC")
	    }
	    else {
		    var m2 = moment(year + " " +  month + " " + day, 'YYYY MMM DD').add(1, 'days')
		var mm2 = m2.toString()
		var dif1 = m2.diff(m)
		var diff1 = humanizeDuration(dif1, { units: ['h', 'm', 's'] , round: true })
		message.reply("You've already used `dailysc` today.\nTime until day change: " + diff1)
	    }
	}
}
module.exports = RanRoll;
