const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var pluralize = require('pluralize')
var name = require('../../library/lib.js').name;
require('@gouch/to-title-case')

var cc1 = {
	"/wiki/Asar": "Iron Soldier",
	"/wiki/Leeanne": "Iron Heavy Armor",
	"/wiki/Valerie": "Iron Mage",
	"/wiki/Soma" :"Iron Archer",
	"/wiki/Mortimer" :"Iron Bandit",
	"/wiki/Saizou" :"Iron Ninja"
}
var cc2 = {
	"/wiki/Asar": "Silver Soldier",
	"/wiki/Leeanne": "Silver Heavy Armor",
	"/wiki/Valerie": "Silver Mage",
	"/wiki/Niel" :"Silver Angel",
	"/wiki/Soma" :"Silver Archer",
	"/wiki/Mortimer" :"Silver Bandit",
	"/wiki/Elaine" :"Silver Valkyrie",
	"/wiki/Alissa" :"Silver Healer",
	"/wiki/Saizou" :"Silver Ninja",
	"/wiki/Calliope" :"Silver Witch",
	"/wiki/Fudou" :"Silver Bishop",
	"/wiki/Cecily" :"Silver Rogue",
	"/wiki/Sanosuke" :"Silver Samurai",
	"/wiki/Percis" :"Silver Gunner",
	"/wiki/Ricardo" :"Silver Magic Fencer",
	"/wiki/Khuri" :"Silver Vampire Hunter",
	"/wiki/Giovanni" :"Silver Pirate",
	"/wiki/Dan" :"Silver Monk",
	"/wiki/Ertel" :"Silver Priest Warrior"
}
var aw1 = {
	"/wiki/Asar": "**Gold Soldie**r \nOR \n**CC Silver Soldier:** \n1 x Iron Soldier \n1 x Iron Heavy Armor \n2 x Silver Soldiers \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Leeanne": "**Gold Heavy Armor** \nOR \n**CC Silver Heavy Armor:** \n1 x Iron Soldier \n1 x Iron Heavy Armor \n2 x Silver Heavy Armors \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Valerie": "**Gold Mage** \nOR \n**CC Silver Mage:** \n1 x Iron Soldier \n1 x Iron Mage \n2 x Silver Mages \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Niel" :"**Gold Angel** \nOR \n**CC Silver Angel:** \n1 x Iron Soldier \n1 x Iron Heavy Armor \n2 x Silver Angels \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Daniela" :"**Gold Archer** \nOR \n**CC Silver Bandit:** \n2 x Iron Archers \n2 x Silver Archers \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Eunice" :"**Gold Bandit** \nOR \n**CC Silver Bandit:** \n1 x Iron Soldier \n1 x Iron Bandit \n2 x Silver Bandits \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Elaine" :"**Gold Valkyrie** \nOR \n**CC Silver Valkyrie**: \n1 x Iron Soldier \n1 x Iron Heavy Armor \n2 x Silver Valkyries \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Alissa" :"**Gold Healer** \nOR \n**CC Silver Healer:** \n1 x Iron Archer \n1 x Iron Mage \n2 x Silver Healers \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Saizou" :"**Gold Ninja** \nOR \n**CC Silver Ninja:** \n1 x Iron Soldier \n1 x Iron Bandit \n2 x Silver Ninjas \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Calliope" :"**Gold Witch** \nOR \n**CC Silver Witch:** \n1 x Iron Archer \n1 x Iron Mage, \n2 x Silver Witches \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Fudou" :"**Gold Bishop** \nOR \n**CC Silver Bishop:** \n2 x Iron Mages \n1 x Silver Healers \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys) \n1 x Silver Bishop",
	"/wiki/Cecily" :"**Gold Rogue** \nOR \n**CC Silver Rouge:** \n1 x Iron Soldier \n1 x Iron Archer \n2 x Silver Rouges \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Sanosuke" :"**Gold Samurai** \nOR \n**CC Silver Samurai:** \n1 x Iron Soldier \n1 x Iron Mage \n2 x Silver Samurai \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Percis" :"**Gold Gunner** \nOR \n**CC Silver Gunner:** \n1 x Iron Soldier \n1 x Iron Archer, \n2 x Silver Gunners \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Ricardo" :"**Gold Magic Fencer** \nOR \n**CC Silver Magic Fencer:** \n1 x Iron Soldier \n1 x Iron Mage \n2 x Silver Magic Fencers \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Khuri" :"**Gold Vampire Hunter** \nOR \n**CC Silver Vampire Hunter:** \n2 x Iron Archers \n2 x Silver Vampire Hunters \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Giovanni" :"**Gold Pirate** \nOR \n**CC Silver Pirate:** \n1 x Iron Archer \n1 x Iron Bandit \n2 x Silver Pirates \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Dan" :"**Gold Monk** \nOR \n**CC Silver Monk:** \n1 x Iron Soldier \n1 x Iron Archer \n2 x Silver Monks \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Ertel" :"**Gold Priest Warrior** \nOR \n**CC Silver Priest Warrior:** \n1 x Iron Soldier \n1 x Iron Heavy Armor \n2 x Silver Priest Warriors \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)",
	"/wiki/Gadoras" :"**Gold Dragon Soldier** \nOR**CC Silver Dragon Soldier:** \n1 x Iron Soldier \n1 x Iron Bandit \n1 x Silver Heavy Armor \n1 x Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys) \n1 x Silver Dragon Soldier"
}
var awo = {
	"Sniper Orb": "Sniper Orb (Monday)",
	"Dark Knight Orb": "Dark Knight Orb (Monday)",
	"Priest Orb": "Priest Orb (Monday)",
	"Rearguard Strategist Orb": "Rearguard Strategist Orb (Monday)",
	"Heavy Gunner Orb": "Heavy Gunner Orb (Monday)",
	"Unicorn Knight Orb": "Unicorn Knight Orb (Tuesday)",
	"Pegasus Knight Orb": "Pegasus Knight Orb (Tuesday)",
	"Master Monk Orb": "Master Monk Orb (Tuesday)",
	"Berserker Orb": "Berserker Orb (Tuesday)",
	"Feng Shui Master Orb": "Feng Shui Master Orb (Tuesday)",
	"Soldier Chief Orb": "Soldier Chief Orb (Wednesday)",
	"Assassin Orb": "Assassin Orb (Wednesday)",
	"Captain Orb": "Captain Orb (Wednesday)",
	"High Shaman Orb": "High Shaman Orb (Wednesday)",
	"High Bishop Orb": "High Bishop Orb (Wednesday)",
	"Battle Master Orb": "Battle Master Orb (Thursday)",
	"Samurai Master Orb": "Samurai Master Orb (Thursday)",
	"Rune Fence Orb": "Rune Fence Orb (Thursday)",
	"Vampire Killer Orb": "Vampire Killer Orb (Thursday)",
	"Sailor Chief Orb": "Sailor Chief Orb (Thursday)",
	"Lord Witch Orb": "Lord Witch Orb (Friday)",
	"Warlock Orb": "Warlock Orb (Friday)",
	"Vanguard Strategist Orb": "Vanguard Strategist Orb (Friday)",
	"Ninja Master Orb": "Ninja Master Orb (Friday)",
	"Arch Angel Orb": "Arch Angel Orb (Friday)",
	"Battle Mage Orb": "Battle Mage Orb (Saturday)",
	"High Ranger Orb": "High Ranger Orb (Saturday)",
	"Top Dancer Orb": "Top Dancer Orb (Saturday)",
	"Dragon Knight Orb": "Dragon Knight Orb (Saturday)",
	"Priest Warrior Leade Orb": "Priest Warrior Leade Orb (Saturday)",
	"High Alchemist Orb": "High Alchemist Orb (Sunday)",
	"Witch Doctor Orb": "Witch Doctor Orb (Sunday)",
	"Machinist Orb": "Machinist Orb (Sunday)",
	"Master Thief Orb": "Master Thief Orb (Sunday)",
	"Bowrider Chief Orb": "Bowrider Chief Orb (Sunday)"
}
class FindMat extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mat',
            group: 'find',
            memberName: 'mat',
            description: 'find required materials to CC and AW an unit'
        });
    }

    async run(message, input) {
        var unit = input.toLowerCase().toTitleCase();
        if (name[unit]) unit = name[unit];
        var link = "https://aigis.fandom.com/wiki/" + unit;

request(link, function(err, resp, html) {
	if (!err) {

		const $ = cheerio.load(html);
		var output;
		var img;
		var aff;
		var pages = [];
		var page = 1;
		var nor = false;
		var aw = false;
		var black = $('.categories').text().includes("Rarity:Black");
		var plat = $('.categories').text().includes("Rarity:Platinum");
		var sap = $('.categories').text().includes("Rarity:Sapphire");
		var gold = $('.categories').text().includes("Rarity:Gold");
		var silver = $('.categories').text().includes("Rarity:Silver");
		var youkai = $('.categories').text().includes("Youkai");
		var cc = false;
		if ($('.listtable.bgwhite tr').length >= 5) {
			output = $('.c2.numbers').first().text();
				if(output) {cc = true}
		}
		var aw = false;
		output = $('.c3.numbers').first().text();
		if(output) {aw =true}
		var check = false;
		var ccname;
		var awname;
		var ccimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
		if (aw) {var awimg = ($('.c3 td:first-child div a img').attr('data-src'))}
		output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
		if (youkai) {
			awname = na(output);
		}
		else if (na(output) == "Majin" || na(output) == "Jiangshi" || na(output) == "Zhenren" || na(output) == "Onmyouji" || na(output) == "Spirit of War") {
			awname = na(output);
		}
		else if (na(output).slice(-1) == "\】" || na(output).slice(-1) == "\)") {
			let words = na(output).split(' ');
			let le = words.length;
			words[le-2] = pluralize.plural(words[le-2])
			awname = words.join(" ")
		}
		else if (aw) {
			awname = pluralize.plural(na(output));
		}
		if (cc) {
			output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
			if (na(output) == "Samurai") {ccname = na(output)}
			else {ccname = pluralize.plural(na(output))}
			message.channel.send(ccname)
			
			output = $('.c2 td:nth-child(1)').first().html();
			awname = pluralize.plural(na(output));
			let link2 = "https://aigis.fandom.com/wiki/Class_Change/" + ccname;
			request(link2, function(err, resp, html) {
				if (!err) {
					let $2 = cheerio.load(html)
					let mat1 = $2('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(3) table tbody tr td div a').attr('href')
					let mat2 = $2('.gcstyle.bgwhite tr:nth-child(4) td:nth-child(3) table tbody tr td div a').attr('href')
					let mat3 = $2('.gcstyle.bgwhite tr:nth-child(5) td:nth-child(2) table tbody tr td div a').attr('href')
					let embedcc = new Discord.RichEmbed();
					embedcc.setTitle("CC Materials")
					embedcc.setThumbnail(ccimg)
					if (silver || gold) {embedcc.addField("Material 1", cc1[mat1], true)}
					else {embedcc.addField("Material 1", cc2[mat1], true)}
					if (silver || gold) {embedcc.addField("Material 2", cc1[mat2], true)}
					else {embedcc.addField("Material 2", cc2[mat2], true)}
					embedcc.addField("Material 3", cc2[mat3], true);
					if (silver) {embedcc.addField("Fairy", "Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)", true)}
					if (gold) {embedcc.addField("Fairy", "Spirit of Gold (Nina) \nOR \nSpirit Queen (Gladys)", true)}
					if (sap) {embedcc.addField("Fairy", "Spirit Queen (Gladys)", true)}
					if (plat) {embedcc.addField("Fairy", "Spirit of Platinum (Celia) \nOR \nSpirit Queen (Gladys)", true)}
					if (black) {embedcc.addField("Fairy", "Spirit of Black (Florika) \nOR \nSpirit Queen (Gladys)", true)}
					message.channel.send(embedcc)
				}	
			})
		}
		if (aw) {
			let link2 = "https://aigis.fandom.com/wiki/Awakening/" + awname
			request(link2, function(err, resp, html) {
				if (!err) {
					let $2 = cheerio.load(html)
					let mat1 = $2('.gcstyle.bgwhite tr:nth-child(2) td:nth-child(2) table tbody tr td div a').attr('href')
					let mat2 = $2('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(2) table tbody tr td div a').attr('href')
					let mat3 = $2('.gcstyle.bgwhite tr:nth-child(4) td:nth-child(2) table tbody tr td div a').attr('href')
					let embedaw = new Discord.RichEmbed();
					let orbs = $2('.gcstyle.bgwhite tr:nth-child(5) td:nth-child(3)').text()
					let parts = orbs.split('&')
					let len = parts.length
					parts[len-1] = parts[len-1].slice(0,-1)
					for (var i = 0; i < len; i++) {
						parts[i] = parts[i].slice(5).toTitleCase()
						}
					let orb1 = awo[parts[0]]
					if (len == 2) {let orb2 = awo[parts[1]]}
					message.channel.send(orb1)
					embedaw.setTitle("AW/AW2/SAW Materials")
					embedaw.setThumbnail(awimg)
					embedaw.addField("Material 1 (For AW/AW2)", aw1[mat1], true)
					embedaw.addField("Material 2 (For AW/AW2)", aw1[mat2], true)
					embedaw.addField("Material 3 (For AW/AW2)", aw1[mat3], true)
					embedaw.addField("Fairy", "**AW:** \nSpirit of Awakening (Victoire)\n**AW2:** \nSpirit of Perpetual Darkness (Onyx)\n**SAW:** \nSpirit of Skill Awakening (Naiad)", true)
					message.channel.send(embedaw)
					if (gold) {
						embedaw.addField("Money", "200,000G", true)
						if (len == 1) {
							embedaw.addField("Orbs", orb1 + " x 1", true)
						}
						else if (len == 2) {
							embedaw.addField("Orbs", orb1 + " x 1 & " + orb2 + " x 1", true)
						}
					}
					if (plat || sap) {
						embedaw.addField("Money", "250,000G", true)
						if (len == 1) {
							embedaw.addField("Orbs", orb1 + " x 2", true)
						}
						else if (len == 2) {
							embedaw.addField("Orbs", orb1 + " x 2 & " + orb2 + " x 2", true)
						}
					}
					if (black) {
						embedaw.addField("Money", "300,000G", true)
						if (len == 1) {
							embedaw.addField("Orbs", orb1 + " x 3", true)
						}
						else if (len == 2) {
							embedaw.addField("Orbs", orb1 + " x 3 & " + orb2 + " x 3", true)
						}
					}
				}
			})
		}
                if (!cc && !aw) {message.channel.send("No Data")};
    
	}
	    
})
    }
}

function te(output) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
	output = he.decode(output);
    output = output.trim();
    var arr = output.split('\n');
	var filtered = arr.filter(function (el) {
  	return el != null && el != '';
	});
   return filtered;
}
function te2(output) {
  output = output.replace(/<[^>]*>/g, "\n");
  output = output.replace(/\n+ /g, "\n");
  output = he.decode(output);
  output = output.trim();
  var arr = output.split('\n');
  var filtered = arr.filter(function(el) {
    return el != null && el != '' && el.substring(0,12) != "This ability";
  });
  return filtered.join("\n");
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
module.exports = FindMat;
