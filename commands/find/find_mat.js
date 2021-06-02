const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var pluralize = require('pluralize')
var functions = require('../../functions.js');
require('@gouch/to-title-case')
var urlencode = require('urlencode');

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
	"/wiki/Asar": "**Gold Soldie**r \nOR \n**CC Silver Soldier**",
	"/wiki/Leeanne": "**Gold Heavy Armor** \nOR \n**CC Silver Heavy Armor**",
	"/wiki/Valerie": "**Gold Mage** \nOR \n**CC Silver Mage**",
	"/wiki/Niel" :"**Gold Angel** \nOR \n**CC Silver Angel**",
	"/wiki/Daniela" :"**Gold Archer** \nOR \n**CC Silver Archer**",
	"/wiki/Eunice" :"**Gold Bandit** \nOR \n**CC Silver Bandit**",
	"/wiki/Elaine" :"**Gold Valkyrie** \nOR \n**CC Silver Valkyrie**",
	"/wiki/Alissa" :"**Gold Healer** \nOR \n**CC Silver Healer**",
	"/wiki/Saizou" :"**Gold Ninja** \nOR \n**CC Silver Ninja**",
	"/wiki/Calliope" :"**Gold Witch** \nOR \n**CC Silver Witch**",
	"/wiki/Fudou" :"**Gold Bishop** \nOR \n**CC Silver Bishop**",
	"/wiki/Cecily" :"**Gold Rogue** \nOR \n**CC Silver Rouge**",
	"/wiki/Sanosuke" :"**Gold Samurai** \nOR \n**CC Silver Samurai**",
	"/wiki/Percis" :"**Gold Gunner** \nOR \n**CC Silver Gunner**",
	"/wiki/Ricardo" :"**Gold Magic Fencer** \nOR \n**CC Silver Magic Fencer**",
	"/wiki/Khuri" :"**Gold Vampire Hunter** \nOR \n**CC Silver Vampire Hunter**",
	"/wiki/Giovanni" :"**Gold Pirate** \nOR \n**CC Silver Pirate**",
	"/wiki/Dan" :"**Gold Monk** \nOR \n**CC Silver Monk**",
	"/wiki/Ertel" :"**Gold Priest Warrior** \nOR \n**CC Silver Priest Warrior**",
	"/wiki/Gadoras" :"**Gold Dragon Soldier** \nOR** \nCC Silver Dragon Soldier**"
}
var aw1d = {
	"/wiki/Asar": "1 x Iron Soldier \n1 x Iron Heavy Armor \n1 x Silver Soldier \n1 x Silver Spirit",
	"/wiki/Leeanne": "1 x Iron Soldier \n1 x Iron Heavy Armor \n1 x Silver Heavy Armor \n1 x Silver Spirit",
	"/wiki/Valerie": "1 x Iron Soldier \n1 x Iron Mage \n1 x Silver Mage \n1 x Silver Spirit",
	"/wiki/Niel" :"1 x Iron Soldier \n1 x Iron Heavy Armor \n1 x Silver Angel \n1 x Silver Spirit",
	"/wiki/Daniela" :"2 x Iron Archers \n1 x Silver Archer \n1 x Silver Spirit",
	"/wiki/Eunice" :"1 x Iron Soldier \n1 x Iron Bandit \n1 x Silver Bandit \n1 x Silver Spirit",
	"/wiki/Elaine" :"1 x Iron Soldier \n1 x Iron Heavy Armor \n1 x Silver Valkyrie \n1 x Silver Spirit",
	"/wiki/Alissa" :"1 x Iron Archer \n1 x Iron Mage \n1 x Silver Healer \n1 x Silver Spirit",
	"/wiki/Saizou" :"1 x Iron Soldier \n1 x Iron Bandit \n1 x Silver Ninja \n1 x Silver Spirit",
	"/wiki/Calliope" :"1 x Iron Archer \n1 x Iron Mage \n1 x Silver Witch \n1 x Silver Spirit",
	"/wiki/Fudou" :"2 x Iron Mages \n1 x Silver Healer \n1 x Silver Spirit",
	"/wiki/Cecily" :"1 x Iron Soldier \n1 x Iron Archer \n1 x Silver Rouge \n1 x Silver Spirit",
	"/wiki/Sanosuke" :"1 x Iron Soldier \n1 x Iron Mage \n1 x Silver Samurai \n1 x Silver Spirit",
	"/wiki/Percis" :"1 x Iron Soldier \n1 x Iron Archer, \n1 x Silver Gunner \n1 x Silver Spirit",
	"/wiki/Ricardo" :"1 x Iron Soldier \n1 x Iron Mage \n1 x Silver Magic Fencer \n1 x Silver Spirit",
	"/wiki/Khuri" :"2 x Iron Archers \n1 x Silver Vampire Hunter \n1 x Silver Spirit",
	"/wiki/Giovanni" :"1 x Iron Archer \n1 x Iron Bandit \n1 x Silver Pirate \n1 x Silver Spirit",
	"/wiki/Dan" :"1 x Iron Soldier \n1 x Iron Archer \n1 x Silver Monk \n1 x Silver Spirit",
	"/wiki/Ertel" :"1 x Iron Soldier \n1 x Iron Heavy Armor \n1 x Silver Priest Warrior \n1 x Silver Spirit",
	"/wiki/Gadoras" :"1 x Iron Soldier \n1 x Iron Bandit \n1 x Silver Heavy Armor \n1 x Silver Spirit"
}
var awo = {
	"Sniper Orb": "Sniper (Mon)",
	"Dark Knight Orb": "Dark Knight (Mon)",
	"Priest Orb": "Priest (Mon)",
	"Rearguard Strategist Orb": "Rearguard Strategist (Mon)",
	"Heavy Gunner Orb": "Heavy Gunner (Mon)",
	"Unicorn Knight Orb": "Unicorn Knight (Tue)",
	"Pegasus Knight Orb": "Pegasus Knight (Tue)",
	"Master Monk Orb": "Master Monk (Tue)",
	"Berserker Orb": "Berserker (Tue)",
	"Feng Shui Master Orb": "Feng Shui Master (Tue)",
	"Soldier Chief Orb": "Soldier Chief (Wed)",
	"Assassin Orb": "Assassin (Wed)",
	"Captain Orb": "Captain (Wed)",
	"High Shaman Orb": "High Shaman (Wed)",
	"High Bishop Orb": "High Bishop (Wed)",
	"Battle Master Orb": "Battle Master (Thu)",
	"Samurai Master Orb": "Samurai Master (Thu)",
	"Rune Fencer Orb": "Rune Fencer (Thu)",
	"Vampire Killer Orb": "Vampire Killer (Thu)",
	"Sailor Chief Orb": "Sailor Chief (Thu)",
	"Lord Witch Orb": "Lord Witch (Fri)",
	"Warlock Orb": "Warlock (Fri)",
	"Vanguard Strategist Orb": "Vanguard Strategist (Fri)",
	"Ninja Master Orb": "Ninja Master (Fri)",
	"Arch Angel Orb": "Arch Angel (Fri)",
	"Battle Mage Orb": "Battle Mage (Sat)",
	"High Ranger Orb": "High Ranger (Sat)",
	"Top Dancer Orb": "Top Dancer (Sat)",
	"Dragon Knight Orb": "Dragon Knight (Sat)",
	"Priest Warrior Leader Orb": "Priest Warrior Leader (Sat)",
	"High Alchemist Orb": "High Alchemist (Sun)",
	"Witch Doctor Orb": "Witch Doctor (Sun)",
	"Machinist Orb": "Machinist (Sun)",
	"Master Thief Orb": "Master Thief (Sun)",
	"Bowrider Chief Orb": "Bowrider Chief (Sun)",
	"Sniper": "Sniper (Mon)",
	"Dark Knight": "Dark Knight (Mon)",
	"Priest": "Priest (Mon)",
	"Rearguard Strategist": "Rearguard Strategist (Mon)",
	"Heavy Gunner": "Heavy Gunner (Mon)",
	"Unicorn Knight": "Unicorn Knight (Tue)",
	"Pegasus Knight": "Pegasus Knight (Tue)",
	"Master Monk": "Master Monk (Tue)",
	"Berserker": "Berserker (Tue)",
	"Feng Shui Master": "Feng Shui Master (Tue)",
	"Soldier Chief": "Soldier Chief (Wed)",
	"Assassin": "Assassin (Wed)",
	"Captain": "Captain (Wed)",
	"High Shaman": "High Shaman (Wed)",
	"High Bishop": "High Bishop (Wed)",
	"Battle Master": "Battle Master (Thu)",
	"Samurai Master": "Samurai Master (Thu)",
	"Rune Fencer": "Rune Fencer (Thu)",
	"Vampire Killer": "Vampire Killer (Thu)",
	"Sailor Chief": "Sailor Chief (Thu)",
	"Lord Witch": "Lord Witch (Fri)",
	"Warlock": "Warlock (Fri)",
	"Vanguard Strategist": "Vanguard Strategist (Fri)",
	"Ninja Master": "Ninja Master (Fri)",
	"Arch Angel": "Arch Angel (Fri)",
	"Battle Mage": "Battle Mage (Sat)",
	"High Ranger": "High Ranger (Sat)",
	"Top Dancer": "Top Dancer (Sat)",
	"Dragon Knight": "Dragon Knight (Sat)",
	"Priest Warrior Leader": "Priest Warrior Leader (Sat)",
	"High Alchemist": "High Alchemist (Sun)",
	"Witch Doctor": "Witch Doctor (Sun)",
	"Machinist": "Machinist (Sun)",
	"Master Thief": "Master Thief (Sun)",
	"Bowrider Chief": "Bowrider Chief (Sun)"
}
class FindMat extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'mat',
		aliases: ['m', 'material', 'materials'],
            	group: 'find',
            	memberName: 'mat',
            	description: 'find required materials to CC and AW an unit',
		examples: ['&mat quill'],
		args: [{
		    key: 'text',
			prompt: 'What unit do you want to know about?',
		    type: 'string'
		}]
        });
    }

    async run(message, { text }) {
        var unit = functions.nameChange(text)
        var link = "https://aigis.fandom.com/wiki/" + urlencode(unit) + "/stats";

request(link, function(err, resp, html) {
	if (!err) {

		const $ = cheerio.load(html);
		var output;
		var img;
		var aff;
		var pages = [];
		var page = 1;
		var black = $('.categories').text().includes("Rarity:Black");
		var plat = $('.categories').text().includes("Rarity:Platinum");
		var sap = $('.categories').text().includes("Rarity:Sapphire");
		var gold = $('.categories').text().includes("Rarity:Gold");
		var silver = $('.categories').text().includes("Rarity:Silver");
		var youkai = $('.categories').text().includes("Youkai");
		console.log($('.categories').text())
		var cc = false;
		if ($('.listtable.bgwhite tr').length >= 5) {
			output = $('.c2.numbers').first().text();
				if(output) {cc = true}
		}
		var aw = false;
		output = $('.c3.numbers').first().text();
		if(output) {aw =true}
		var aw2 = false;
		output = $('.c4.numbers').first().text();
		if(output) {aw2 =true}
		output = $('.c5.numbers').first().text();
		if(output) {aw2 =true}
		var check = false;
		var ccname;
		var awname;
		var ccimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
		if (!ccimg) {ccimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('src'));}
		if (aw) {
			var awimg
			if ($('.c3 td:nth-child(3)').hasClass('leftal')) {
				awimg = ($('.c3 td:first-child div a img').attr('data-src'));
				if (!awimg) {awimg = ($('.c3 td:first-child div a img').attr('src'));}
				
			}
			if (!$('.c3 td:nth-child(3)').hasClass('leftal')) {
				awimg = ccimg;
			}
		}
		output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
		if (output) {
			console.log(youkai)
			if (youkai) {
				awname = na(output);
			}
			else if (na(output) == "Majin" || na(output) == "Jiangshi" || na(output) == "Zhenren" || na(output) == "Onmyouji") {
				awname = na(output);
			}
			else if (na(output) == "Spirit of War") {awname = "Spirits of War"}
			else if (na(output) == "Dragon Shaman") {awname = "Dragon Shamans"}
			else if (na(output) == "Shaman") {awname = "High Shamans"}
			else if (na(output).slice(-1) == "\】" || na(output).slice(-1) == "\)") {
				let words = na(output).split(' ');
				let le = words.length;
				words[le-2] = pluralize.plural(words[le-2])
				awname = words.join(" ")
			}
			else if (aw) {
				awname = pluralize.plural(na(output));
			}
		}
		if (cc && !aw) {
			output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
			if (na(output) == "Samurai" || na(output) == "Heavy Artillery") {ccname = na(output)}
			else if (na(output) == "Intermediate Dragon Soldier"){ccname = "Dragon Soldiers"}
			else if (na(output) == "Priestess Warrior"){ccname = "Priest Warriors"}
			else if (na(output) == "Shaman"){ccname = "Shamans"}
			else {ccname = pluralize.plural(na(output))}
			
			let link2 = "https://aigis.fandom.com/wiki/Class_Change/" + urlencode(ccname);
			request(link2, function(err, resp, html) {
				if (!err) {
					let $2 = cheerio.load(html)
					let mat1 = $2('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(3) table tbody tr td div a').attr('href')
					let mat2 = $2('.gcstyle.bgwhite tr:nth-child(4) td:nth-child(3) table tbody tr td div a').attr('href')
					let mat3 = $2('.gcstyle.bgwhite tr:nth-child(5) td:nth-child(2) table tbody tr td div a').attr('href')
					let embedcc = new Discord.RichEmbed();
					embedcc.setTitle("CC Materials")
					embedcc.setURL(link)
					embedcc.setThumbnail(ccimg)
					embedcc.setColor('RED')
					if (ccname == "Dancers") {
						if (silver || gold) {embedcc.addField("Material 1", "Iron Soldier", true)}
						else {embedcc.addField("Material 1", cc2[mat1], true)}
					}
					else if (silver || gold) {embedcc.addField("Material 1", cc1[mat1], true)}
					else {embedcc.addField("Material 1", cc2[mat1], true)}
					if (ccname == "Dancers") {
						if (silver || gold) {embedcc.addField("Material 2", "Iron Mage", true)}
						else {embedcc.addField("Material 1", cc2[mat1], true)}
					}
					else if (silver || gold) {embedcc.addField("Material 2", cc1[mat2], true)}
					else {embedcc.addField("Material 2", cc2[mat2], true)}
					if (ccname == "Dancers") {
						if (silver || gold) {embedcc.addField("Material 3", "Silver Mage", true)}
					}
					else {embedcc.addField("Material 3", cc2[mat3], true)}
					if (silver) {embedcc.addField("Fairy", "Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)", true)}
					if (gold) {embedcc.addField("Fairy", "Spirit of Gold (Nina) \nOR \nSpirit Queen (Gladys)", true)}
					if (sap) {embedcc.addField("Fairy", "Spirit Queen (Gladys)", true)}
					if (plat) {embedcc.addField("Fairy", "Spirit of Platinum (Celia) \nOR \nSpirit Queen (Gladys)", true)}
					if (black) {embedcc.addField("Fairy", "Spirit of Black (Florika) \nOR \nSpirit Queen (Gladys)", true)}
					message.channel.send(embedcc)
				}	
			})
		}
		if (aw && !cc) {
			let link3 = "https://aigis.fandom.com/wiki/Awakening/" + urlencode(awname)
			request(link3, function(err, resp, html) {
				if (!err) {
					console.log(awname)
					let $3 = cheerio.load(html)
					let mat1 = $3('.gcstyle.bgwhite tr:nth-child(2) td:nth-child(2) table tbody tr td div a').attr('href')
					let mat2 = $3('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(2) table tbody tr td div a').attr('href')
					let mat3 = $3('.gcstyle.bgwhite tr:nth-child(4) td:nth-child(2) table tbody tr td div a').attr('href')
					console.log(mat1)
					let embedaw = new Discord.RichEmbed();
					embedaw.setColor('BLUE')
					embedaw.setURL(link)
					let orbs = $3('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(3)').text()
					let parts = orbs.split('&')
					console.log(parts)
					let len = parts.length
					parts[len-1] = parts[len-1].slice(0,-1)
					for (var i = 0; i < len; i++) {
						parts[i] = parts[i].slice(5).toTitleCase()
						parts[i] = na(parts[i])
						}
					let orb1 = awo[parts[0]]
					let orb2
					if (len == 2) {
						orb2 = awo[parts[1]]
					}
					if (aw2) {
						embedaw.setTitle("AW/AW2/SAW Materials")
						embedaw.setThumbnail(awimg)
						embedaw.addField("Material 1", aw1[mat1], true)
						embedaw.addField("Material 2", aw1[mat2], true)
						embedaw.addField("Material 3", aw1[mat3], true)
						embedaw.addField("Fairy", "**AW:** Spirit of Awakening \n(Victoire)\n**AW2:** Spirit of Perpetual \nDarkness (Onyx)\n**SAW:** Spirit of Skill \nAwakening (Naiad)", true)
					}
					else {
						embedaw.setTitle("AW/SAW Materials")
						embedaw.setThumbnail(awimg)
						embedaw.addField("Material 1", aw1[mat1], true)
						embedaw.addField("Material 2", aw1[mat2], true)
						embedaw.addField("Material 3", aw1[mat3], true)
						embedaw.addField("Fairy", "**AW:** Spirit of Awakening \n(Victoire)\n**SAW:** Spirit of Skill \nAwakening (Naiad)", true)
					}
					if (gold) {
						embedaw.addField("Money", "100,000G", true)
						if (len == 1) {
							embedaw.addField("Orbs", orb1 + " x 1", true)
						}
						else if (len == 2) {
							embedaw.addField("Orbs", orb1 + " x 1 \n" + orb2 + " x 1", true)
						}
					}
					if (plat || sap) {
						embedaw.addField("Money", "200,000G", true)
						if (len == 1) {
							embedaw.addField("Orbs", orb1 + " x 2", true)
						}
						else if (len == 2) {
							embedaw.addField("Orbs", orb1 + " x 2 \n" + orb2 + " x 2", true)
						}
					}
					if (black) {
						embedaw.addField("Money", "300,000G", true)
						if (len == 1) {
							embedaw.addField("Orbs", orb1 + " x 3", true)
						}
						else if (len == 2) {
							embedaw.addField("Orbs", orb1 + " x 3 \n" + orb2 + " x 3", true)
						}
					}
					pages.push(embedaw)
					let embedawd = new Discord.RichEmbed();
					embedawd.setColor('BLUE')
					embedawd.setURL(link)
					embedawd.setTitle("Detailed Materials for CC Silvers")
					embedawd.setThumbnail(awimg)
					embedawd.addField("Material 1", aw1d[mat1], true)
					embedawd.addField("Material 2", aw1d[mat2], true)
					embedawd.addField("Material 3", aw1d[mat3], true)		
					pages.push(embedawd)
					functions.sende(message, pages)
				}
			})
		}
		if (aw && cc) {
			output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
			if (na(output) == "Samurai" || na(output) == "Heavy Artillery") {ccname = na(output)}
			else if (na(output) == "Intermediate Dragon Soldier"){ccname = "Dragon Soldiers"}
			else if (na(output) == "Priestess Warrior"){ccname = "Priest Warriors"}
			else if (na(output) == "Shaman"){ccname = "Shamans"}
			else {ccname = pluralize.plural(na(output))}
			output = $('.c2 td:nth-child(1)').first().html();
			if (na(output) == "Priest") {
				awname = "Priestesses";
			}
			else if (na(output) == "Priestess Warrior Leader") {
				awname = "Priest Warrior Leaders";
			}
			else if (na(output) == "High Shaman"){
				awname = "High Shamans"
			}
			else awname = pluralize.plural(na(output));
			
			let link2 = "https://aigis.fandom.com/wiki/Class_Change/" + urlencode(ccname);
			request(link2, function(err, resp, html) {
				if (!err) {
					let $2 = cheerio.load(html)
					let mat1 = $2('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(3) table tbody tr td div a').attr('href')
					let mat2 = $2('.gcstyle.bgwhite tr:nth-child(4) td:nth-child(3) table tbody tr td div a').attr('href')
					let mat3 = $2('.gcstyle.bgwhite tr:nth-child(5) td:nth-child(2) table tbody tr td div a').attr('href')
					let embedcc = new Discord.RichEmbed();
					embedcc.setTitle("CC Materials")
					embedcc.setURL(link)
					embedcc.setThumbnail(ccimg)
					embedcc.setColor('RED')
					if (ccname == "Dancers") {
						if (silver || gold) {embedcc.addField("Material 1", "Iron Soldier", true)}
						else {embedcc.addField("Material 1", cc2[mat1], true)}
					}
					else if (silver || gold) {embedcc.addField("Material 1", cc1[mat1], true)}
					else {embedcc.addField("Material 1", cc2[mat1], true)}
					if (ccname == "Dancers") {
						if (silver || gold) {embedcc.addField("Material 2", "Iron Mage", true)}
						else {embedcc.addField("Material 1", cc2[mat1], true)}
					}
					else if (silver || gold) {embedcc.addField("Material 2", cc1[mat2], true)}
					else {embedcc.addField("Material 2", cc2[mat2], true)}
					if (ccname == "Dancers") {
						if (silver || gold) {embedcc.addField("Material 3", "Silver Mage", true)}
					}
					else {embedcc.addField("Material 3", cc2[mat3], true)}
					if (silver) {embedcc.addField("Fairy", "Spirit of Silver (Cyrille) \nOR \nSpirit Queen (Gladys)", true)}
					if (gold) {embedcc.addField("Fairy", "Spirit of Gold (Nina) \nOR \nSpirit Queen (Gladys)", true)}
					if (sap) {embedcc.addField("Fairy", "Spirit Queen (Gladys)", true)}
					if (plat) {embedcc.addField("Fairy", "Spirit of Platinum (Celia) \nOR \nSpirit Queen (Gladys)", true)}
					if (black) {embedcc.addField("Fairy", "Spirit of Black (Florika) \nOR \nSpirit Queen (Gladys)", true)}
					pages.push(embedcc)
					let link3 = "https://aigis.fandom.com/wiki/Awakening/" + urlencode(awname)
					request(link3, function(err, resp, html) {
						if (!err) {
							let $3 = cheerio.load(html)
							mat1 = $3('.gcstyle.bgwhite tr:nth-child(2) td:nth-child(2) table tbody tr td div a').attr('href')
							mat2 = $3('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(2) table tbody tr td div a').attr('href')
							mat3 = $3('.gcstyle.bgwhite tr:nth-child(4) td:nth-child(2) table tbody tr td div a').attr('href')
							let embedaw = new Discord.RichEmbed();
							embedaw.setColor('BLUE')
							embedaw.setURL(link)
							let orbs = $3('.gcstyle.bgwhite tr:nth-child(3) td:nth-child(3)').text()
							let parts = orbs.split('&')
							let len = parts.length
							parts[len-1] = parts[len-1].slice(0,-1)
							for (var i = 0; i < len; i++) {
								parts[i] = parts[i].slice(5).toTitleCase()
								parts[i] = na(parts[i])
								}
							let orb1 = awo[parts[0]]
							let orb2
							if (len == 2) {
								orb2 = awo[parts[1]]
							}
							if (aw2) {
								embedaw.setTitle("AW/AW2/SAW Materials")
								embedaw.setThumbnail(awimg)
								embedaw.addField("Material 1", aw1[mat1], true)
								embedaw.addField("Material 2", aw1[mat2], true)
								embedaw.addField("Material 3", aw1[mat3], true)
								embedaw.addField("Fairy", "**AW:** Spirit of Awakening \n(Victoire)\n**AW2:** Spirit of Perpetual \nDarkness (Onyx)\n**SAW:** Spirit of Skill \nAwakening (Naiad)", true)
							}
							else {
								embedaw.setTitle("AW/SAW Materials")
								embedaw.setThumbnail(awimg)
								embedaw.addField("Material 1", aw1[mat1], true)
								embedaw.addField("Material 2", aw1[mat2], true)
								embedaw.addField("Material 3", aw1[mat3], true)
								embedaw.addField("Fairy", "**AW:** Spirit of Awakening \n(Victoire)\n**SAW:** Spirit of Skill \nAwakening (Naiad)", true)
							}
							if (gold) {
								embedaw.addField("Money", "100,000G", true)
								if (len == 1) {
									embedaw.addField("Orbs", orb1 + " x 1", true)
								}
								else if (len == 2) {
									embedaw.addField("Orbs", orb1 + " x 1 \n" + orb2 + " x 1", true)
								}
							}
							if (plat || sap) {
								embedaw.addField("Money", "200,000G", true)
								if (len == 1) {
									embedaw.addField("Orbs", orb1 + " x 2", true)
								}
								else if (len == 2) {
									embedaw.addField("Orbs", orb1 + " x 2 \n" + orb2 + " x 2", true)
								}
							}
							if (black) {
								embedaw.addField("Money", "300,000G", true)
								if (len == 1) {
									embedaw.addField("Orbs", orb1 + " x 3", true)
								}
								else if (len == 2) {
									embedaw.addField("Orbs", orb1 + " x 3 \n" + orb2 + " x 3", true)
								}
							}
							pages.push(embedaw)
							let embedawd = new Discord.RichEmbed();
							embedawd.setColor('BLUE')
							embedawd.setURL(link)
							embedawd.setTitle("Detailed Materials for CC Silvers")
							embedawd.setThumbnail(awimg)
							embedawd.addField("Material 1", aw1d[mat1], true)
							embedawd.addField("Material 2", aw1d[mat2], true)
							embedawd.addField("Material 3", aw1d[mat3], true)		
							pages.push(embedawd)
							functions.sende(message, pages)
						}
					})
				}	
			})
		}
                if (!cc && !aw) {message.channel.send("No Data")};
    
	}
	    
})
    }
}

function te(output) {
	if (output == null) return
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
	if (output == null) return
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
	if (output == null) return
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
