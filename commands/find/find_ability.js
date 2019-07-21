const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var name = require('../../library/lib.js').name;
var functions = require('../../functions.js');


class FindAbility extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ability',
            group: 'find',
            memberName: 'ability',
            description: 'find abilities of an unit'
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
    var aff;
    var silver = $('.categories').text().includes("Rarity:Silver");
    var nor = false;
    var sil = false;
    var aw = false;
    output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
    if (silver) {
    	message.channel.send("Silver")
    }
    if (!silver) {
	output = $('.listtable.bgwhite tr:nth-child(3)').first().text();
      if (output) {
        output = $('.listtable.bgwhite tr:nth-child(3) td:nth-child(14)').first().html();
        aff = na(output);
        if (aff != "N/A") {
          nor = true
          var norna = aff;
          var norimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
          message.channel.send(norna)
          message.channel.send(norimg)
        }
      }
      message.channel.send(" NotSilver")
      }
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
  output = output.replace(/<[^>]*>/g, "*");
  output = output.replace(/\n+ /g, "\n");
  output = he.decode(output);
  output = output.trim();
  var arr = output.split('\n');
  var filtered = arr.filter(function(el) {
    return el != null && el != '';
  });
  return filtered;
}
module.exports = FindAbility;
