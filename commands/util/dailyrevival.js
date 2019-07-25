const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var moment = require('moment');
require('@gouch/to-title-case')

class UtilDaily extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'dailyrevival',
		aliases: ['dr'],
            group: 'util',
            memberName: 'dailyrevival',
            description: 'find daily revival maps to get silver units',
		examples: ['~farm soldier'],
        });
    }

    async run(message, input) {
        var link = "https://wikiwiki.jp/aigiszuki/"
        var link2 = "https://aigis.fandom.com/wiki/Daily_Revivals"
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
          "砂浜を駆ける魔術師": "Maya (Swimsuit)	"
        }

request(link, function(err, resp, html) {
	if (!err) {
    var now = new Date()
		var m = moment(now).add(9, 'hours')
		var mm = m.format('ddd MMM DD YYYY HH mm ss')
		var words = mm.split(' ')
		var date = words[0]
		var check = false;
		var pages = [];
		var page = 1;
		const $ = cheerio.load(html);
		var output = na($('.style_table').html())
    var tname;
    var names = output.split(' ')
    if (date == "Mon") {
      tname = names[1]
    }
    else if (date == "Tue") {
      tname = names[3]
    }
    else if (date == "Wed") {
      tname = names[5]
    }
    else if (date == "Thu") {
      tname = names[7]
    }
    else if (date == "Fri") {
      tname = names[9]
    }
    else if (date == "Sat") {
      tname = names[11]
    }
    else if (date == "Sun") {
      tname = names[13]
    }
    tname = japname[tname];
    console.log(tname)
    request(link2, function(err, resp, html) {
	    if (!err) {
        const $2 = cheerio.load(html);
        $2('.mw-collapsible.wikitable').each(function(i, elem) {
			    let aaa = na($2(elem).find('tr').first().text())
          if (aaa == "Daily Revivals Rotation") {
            let len = $2(elem).find('tr').length
            var embed = new Discord.RichEmbed()
				    embed.setColor('RANDOM')
            for (var j = 2; j < len; j++) {
              let ename = na($2(elem).find('tr').eq(j).children().eq(1).text())
              let uname = na($2(elem).find('tr').eq(j).children().eq(3).text())
              let uclass = na($2(elem).find('tr').eq(j).children().eq(4).text())
              if (tname == uname) {console.log('Today Revival')}
              let ename2
              let uname2
              let uclass2
              if (j == 2){
                ename2 = $2(elem).find('tr').eq(j).children().eq(7).text()
                uname2 = $2(elem).find('tr').eq(j).children().eq(9).text()
                uclass2 = $2(elem).find('tr').eq(j).children().eq(10).text()
              }
              else {
                ename2 = $2(elem).find('tr').eq(j).children().eq(6).text()
                uname2 = $2(elem).find('tr').eq(j).children().eq(8).text()
                uclass2 = $2(elem).find('tr').eq(j).children().eq(9).text()
              }
              if (j%4 == 2 && j != 2) {
						    pages.push(embed)
						    embed = new Discord.RichEmbed()
						    embed.setColor('RANDOM')
                if (tname == uname) {
                  embed.addField(ename + " (Today Revival)", "**Event Unit:**" + uname + "          **Class:**" + uclass)
                  page = Math.floor(j/4)
                }
                else {embed.addField(ename, "**Event Unit:**" + uname + "          **Class:**" + uclass)}
              console.log('----------')
                if (uclass2) {
                  if (tname == na(uname2)) {
                    embed.addField(na(ename2) + " (Today Revival)", "**Event Unit:**" + na(uname2) + "          **Class:**" + na(uclass2))
                    page = Math.floor(j/4)
                  }
                  else {embed.addField(na(ename2), "**Event Unit:**" + na(uname2) + "          **Class:**" + na(uclass2))}
                }
              }
				      else {
                if (tname == uname) {
                      embed.addField(ename + " (Today Revival)", "**Event Unit:**" + uname + "          **Class:**" + uclass)
                      page = Math.floor(j/4)
                }
                else {embed.addField(ename, "**Event Unit:**" + uname + "          **Class:**" + uclass)}
                if (uclass2) {
                  if (tname == na(uname2)) {
                      embed.addField(na(ename2) + " (Today Revival)", "**Event Unit:**" + na(uname2) + "          **Class:**" + na(uclass2))
                      page = Math.floor(j/4)
                  }
                  else {embed.addField(na(ename2), "**Event Unit:**" + na(uname2) + "          **Class:**" + na(uclass2))
                  }
			          }
              }
            }
            pages.push(embed)
				embed = new Discord.RichEmbed();
				embed = pages[0]
				embed.setFooter('Page ' + page + ' of ' + pages.length);
				message.channel.send(embed).then(msg => {

					msg.react('⬅').then( r => {
						msg.react('➡')

						// Filters
						const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && !user.bot;
						const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && !user.bot;

						const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000});
						const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000});

						backwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
							if (page === 1) return;
							page--;
							embed = pages[page-1];
							embed.setFooter('Page ' + page + ' of ' + pages.length);
							msg.edit(embed)
						})

						forwards.on('collect', r => {
							r.remove(r.users.filter(u => !u.bot).first());
							if (page === pages.length) return;
							page++;
							embed = pages[page-1];
							embed.setFooter('Page ' + page + ' of ' + pages.length);
							msg.edit(embed)
						})
					})
				})
          }
        })
      }
    })
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
module.exports = UtilDaily;
