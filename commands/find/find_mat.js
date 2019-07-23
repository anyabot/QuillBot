const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var pluralize = require('pluralize')
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');


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
        var unit = functions.toTitleCase(input);
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
		var aw name;
		if (aw) {
			output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
			awname = pluralize.plural(na(output));
		}
		if (cc) {
			output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(3)').first().html();
			ccname = pluralize.plural(na(output));
			message.channel.send(ccname)
			
			output = $('.c2 td:nth-child(1)').first().html();
			awname = pluralize.plural(na(output));
		}
		message.channel.send(awname)
                if (!check) {message.channel.send("No Data")};
    
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
