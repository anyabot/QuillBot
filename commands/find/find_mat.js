const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var pluralize = require('pluralize')
var name = require('../../library/lib.js').name;
require('@gouch/to-title-case')

var cc1 = {
	"/wiki/Asar": "Soldier (Iron)",
	"/wiki/Leeanne": "Heavy Armor (Iron)",
	"/wiki/Valerie": "Mage (Iron)",
	"/wiki/Soma" :"Archer (Iron)",
	"/wiki/Mortimer" :"Bandit (Iron)",
	"/wiki/Saizou" :"Ninja (Iron)"
}
var cc2 = {
	"/wiki/Asar": "Soldier (Silver)",
	"/wiki/Leeanne": "Heavy Armor (Silver)",
	"/wiki/Valerie": "Mage (Silver)",
	"/wiki/Niel" :"Angel (Silver)",
	"/wiki/Soma" :"Archer (Silver)",
	"/wiki/Mortimer" :"Bandit (Silver)",
	"/wiki/Elaine" :"Valkyrie (Silver)",
	"/wiki/Alissa" :"Healer (Silver)",
	"/wiki/Saizou" :"Ninja (Silver)",
	"/wiki/Calliope" :"Witch (Silver)",
	"/wiki/Fudou" :"Bishop (Silver)",
	"/wiki/Cecily" :"Rogue (Silver)",
	"/wiki/Sanosuke" :"Samurai (Silver)",
	"/wiki/Percis" :"Gunner (Silver)",
	"/wiki/Ricardo" :"Magic Fencer (Silver)",
	"/wiki/Khuri" :"Vampire Hunter (Silver)",
	"/wiki/Giovanni" :"Pirate (Silver)",
	"/wiki/Dan" :"Monk (Silver)",
	"/wiki/Ertel" :"Priest Warrior (Silver)"
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
		message.channel.send(awname)
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
