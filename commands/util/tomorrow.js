const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var moment = require('moment');
var printf = require('printf');
require('@gouch/to-title-case');
const humanizeDuration = require('humanize-duration')

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
        var japname = {
          "魔女を救え！": "Cloris",
          "魔女の娘": "Belinda",
          "闇の忍者軍団": "Azami",
          "鬼を宿す剣士": "Momiji",
          "聖戦士の挑戦": "Maribel",
          "影の狙撃手": "Rita",
          "魔人の宿命": "Fran",
          "戦乙女の契約": "Emilia",
          "暗黒騎士団の脅威": "Yurina",
          "暗黒舞踏会": "Waltz",
          "魔術の秘法": "Odette",
          "アンナと雪の美女": "Eliza",
          "山賊王への道": "Rorone",
          "竜騎士の誓い": "Lucille",
          "錬金術士と賢者の石": "Corin",
          "モンクの修行場": "Lin",
          "聖鎚闘士の挑戦": "Miranda",
          "鬼招きの巫女": "Shiho",
          "砲科学校の訓練生": "Kanon",
          "囚われの魔法剣士": "Charlotte",
          "死霊の船と提督の決意": "Reanbell",
          "帝国の天馬騎士": "Isabelle",
          "暗黒騎士団と狙われた癒し手": "Yuno",
          "獣人の誇り": "Ada",
          "白の帝国と偽りの都市": "Lieselotte",
          "堕天使の封印": "Chloe",
          "暗黒騎士団と聖夜の贈り物": "Sarasa",
          "古代の機甲兵": "Rikka",
          "呪術師と妖魔の女王" :"Revy",
          "私掠船長と魔の海域": "Sabrina",
          "ヴァンパイアと聖なる復讐者": "Rumaria",
          "妖魔の女王と戦術の天才": "Helena",
          "魔界蟻と囚われた男達": "Jake / Oscar",
          "天使たちの陰謀": "Sereina",
          "魔蝿の森と呪われた番人": "Aida",
          "失われた竜の島": "Ignis",
          "帝国神官の帰還": "Lucia",
          "闇の組織と狙われた王子": "Seven",
          "オーク格闘家の王子軍入門": "Bestla",
          "王子軍の夏祭り": "Phyllis (Yukata)",
          "カリオペと恐怖の夜": "Calliope (Dress)",
          "夢現のダークプリースト": "Psyche",
          "魔王軍の胎動": "Linaria",
          "彷徨える守護の盾": "Saris",
          "渚に咲きし水着騎兵": "Carrie (Swimsuit)",
          "カボチャの国の魔法使い": "Candy",
          "星に祈りし聖夜の癒し手": "Camilla (Christmas)",
          "学園騎兵科の新入生": "Mischa (School)",
          "白き獣人と闇の組織": "Fluffy",
          "砂浜を駆ける魔術師": "Maya (Swimsuit)",
		"密林のハロウィンパーティー" : "Renarde (Halloween)",
		"デーモンサンタのおもちゃ工場" : "Ertel (Christmas)"
        }
var unum = {
          "Cloris": 1,
          "Belinda": 2,
          "Azami": 3,
          "Momiji": 4,
          "Maribel": 5,
          "Rita": 6,
          "Fran": 7,
          "Emilia": 8,
          "Yurina": 9,
          "Waltz": 10,
          "Odette": 11,
          "Eliza": 12,
          "Rorone": 13,
          "Lucille": 14,
          "Corin": 15,
          "Lin": 16,
          "Miranda": 17,
          "Shiho": 18,
          "Kanon": 19,
          "Charlotte": 20,
          "Reanbell": 21,
          "Isabelle": 22,
          "Yuno" : 23,
          "Ada": 24,
          "Lieselotte": 25,
          "Chloe": 26,
          "Sarasa": 27,
          "Rikka": 28,
          "Revy": 29,
          "Sabrina": 30,
          "Rumaria": 31,
          "Helena": 32,
          "Jake / Oscar": 33,
          "Oscar": 33,
          "Jake": 33,
          "Sereina":34,
          "Aida": 35,
          "Ignis": 36,
          "Lucia": 37,
          "Seven": 38,
          "Bestla": 39,
          "Phyllis (Yukata)": 40,
          "Calliope (Dress)": 41,
          "Psyche": 42,
          "Linaria": 43,
          "Saris": 44,
          "Carrie (Swimsuit)": 45,
          "Candy" : 46,
          "Camilla (Christmas)": 47,
          "Mischa (School)": 48,
          "Fluffy": 49,
          "Maya (Swimsuit)": 50,
		"Renarde (Halloween)": 51,
		"Ertel (Christmas)" : 52
        }
var ulist = [
          "Cloris",
          "Belinda",
          "Azami",
          "Momiji",
          "Maribel",
          "Rita",
          "Fran",
          "Emilia",
          "Yurina",
          "Waltz",
          "Odette",
          "Eliza",
          "Rorone",
          "Lucille",
          "Corin",
          "Lin",
          "Miranda",
          "Shiho",
          "Kanon",
          "Charlotte",
          "Reanbell",
          "Isabelle",
          "Yuno",
          "Ada",
          "Lieselotte",
          "Chloe",
          "Sarasa",
          "Rikka",
          "Revy",
          "Sabrina",
          "Rumaria",
          "Helena",
          "Jake / Oscar",
          "Oscar",
          "Jake",
          "Sereina",
          "Aida",
          "Ignis",
          "Lucia",
          "Seven",
          "Bestla",
          "Phyllis (Yukata)",
          "Calliope (Dress)",
          "Psyche",
          "Linaria",
          "Saris",
          "Carrie (Swimsuit)",
          "Candy",
          "Camilla (Christmas)",
          "Mischa (School)",
          "Fluffy"
        ]

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
			if no > ulist.length {no = no - ulist.length}
			tname = ulist[no -1];
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
