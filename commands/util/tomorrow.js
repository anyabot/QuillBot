const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var moment = require('moment');
var printf = require('printf');
require('@gouch/to-title-case');
const humanizeDuration = require('humanize-duration')
var japname = require('../../revival/japname.js').japname;
var unum = require('../../revival/unum.js').unum;
var ulist = require('../../revival/ulist.js').ulist; 
class UtilToday extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'tomorrow',
            aliases: ['tmr'],
            group: 'util2',
            memberName: 'tomorrow',
            description: 'find tomorrow\'s daily missions and daily revival',
		examples: ['&tomorrow'],
        });
    }

    async run(message, input) {
        var link = "https://wikiwiki.jp/aigiszuki/"

request(link, function(err, resp, html) {
	if (!err) {
    var now = new Date()
		var m = moment(now).add(9, 'hours')
		var mm = m.format('ddd MMM DD YYYY HH mm ss')
		var words = mm.split(' ')
		var month = words[1]
		var day = words[2]
		var year = words[3]
		var m2 = moment(year + " " +  month + " " + day, 'YYYY MMM DD').add(1, 'days')
		var mm2 = m2.toString()
		var dif1 = m2.diff(m)
		var diff1 = humanizeDuration(dif1, { round: true })
		const $ = cheerio.load(html);
		var output = na($('.style_table').html())
    var tname;
	var dm;
  words = mm2.split(' ')
  var date = words[0]
    var names = output.split(' ')
    if (date == "Mon") {
      tname = names[1]
	  dm = "- Daily Farm Map: Armor\n- Orbs: Sniper, Dark Knight, Priest, Rearguard Strategist, Heavy Gunner\n- x1.5 Time Crystal Drop\n- Daily Revival Unit: " 
    }
    else if (date == "Tue") {
      tname = names[3]
	  dm = "- Daily Farm Map: Spirit\n- Orbs: Unicorn Knight, Pegasus Knight, Master Monk, Berserker, Feng Shui Master\n- Daily Revival Unit: "
    }
    else if (date == "Wed") {
      tname = names[5]
	  dm =  "- Daily Farm Map: Demon Crystal\n- Orbs: Soldier Chief, Assassin, Captain, High Shaman, High Bishop\n- x1.5 Time Crystal Drop\n- Daily Revival Unit: " 
    }
    else if (date == "Thu") {
      tname = names[7]
	  dm =  "- Daily Farm Map: Affection / Trust Item\n- Orbs: Battle Master, Samurai Master, Rune Fencer, Vampire Killer, Sailor Chief\n- Daily Revival Unit: " 
    }
    else if (date == "Fri") {
      tname = names[9]
	  dm =  "- Daily Farm Map: Armor\n- Orbs: Lord Witch, Warlock, Vanguard Strategist, Ninja Master, Arch Angel\n- Daily Revival Unit: " 
    }
    else if (date == "Sat") {
      tname = names[11]
	  dm =  "- Daily Farm Map: Spirit / SAW Spirit\n- Orbs: Battle Mage, High Ranger, Top Dancer, Dragon Knight, Priest Warrior Leader\n- x1.5 Time Crystal Drop\n- Daily Revival Unit: " 
    }
    else if (date == "Sun") {
      tname = names[13]
	  dm =  "- Daily Farm Map: Demon Crystal / SAW Spirit\n- Orbs: High Alchemist, Witch Doctor, Machinist, Master Thief, Bowrider Chief\n- Daily Revival Unit: " 
    }
    tname = japname[tname];
		if (date == "Mon") {
		let no = unum[tname];
			no = no + 7;
			if (no > ulist.length) {no = no - ulist.length}
			tname = ulist[no - 1];
		}
	dm = dm + tname + "\n- Day Change In: " + diff1;
	message.channel.send(dm)
  }
})
    }
}
function na(output) {
  output = output.replace(/<[^>]*>/g, "\n");
  output = output.replace(/\n+ /g, "\n");
  output = he.decode(output);
  output = output.trim();
  var arr = output.split('\n');
  var filtered = arr.filter(function(el) {
    return el != null && el != '';
  });
  var na = filtered[0];
  let i = 1;
  while (i < filtered.length) {
    na = na + " " + filtered[i];
    i++;
  }
  return na;
}
module.exports = UtilToday;
