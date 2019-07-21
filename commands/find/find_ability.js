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
      output = $('.c2.numbers').first().text();
      if (output) {
        output = $('.c2.numbers td:nth-child(7)').first().html();
        aff = na(output);
        if (aff != "N/A") {
          sil = true;
          var silna = aff;
          var silimg = ($('.listtable.bgwhite tr:nth-child(3) td:nth-child(2)  div a img').attr('data-src'));
          message.channel.send(silna)
          message.channel.send(silimg)
        }
      }

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
      output = $('.c3.numbers').first().text();
      if (output) {
        output = $('.c3 td:nth-child(13)').first().html();
        aff = na(output);
        if (aff != "N/A") {
          aw = true
          var awna = aff;
          var awimg = ($('.c3 td:first-child div a img').attr('data-src'));
          message.channel.send(awna)
          message.channel.send(awimg)
        }
      }
    }

    $('.gcstyle tbody').each(function(i, elem) {
      output = $(elem).first().text();
      let ar = te(output);
      if (ar[0] === 'Ability Name') {
        if (sil) {
          let $2 = cheerio.load(elem)
          let siz = $2('tr').find('td').length
          let aa = []
          for (var i = 0; i < siz; i++) {
            let cl = te2($2('tr').find('td').eq(i).text().trim() + "+").join("\n")
            aa.push(cl)
          }
          let fil = aa.filter(function(el) {
            return (el != null && el != '' && el.substring(0,1) != "*");
          });
          for (var i = 0; i < fil.length; i++) {
            let nfil = fil[i];
            nfil = nfil.slice(0, -1)
            fil[i] = nfil
          }
          message.channel.send(fil[2])
          message.channel.send(fil[3])
        }
      
        if (nor) {
          let $2 = cheerio.load(elem)
          let siz = $2('tr').find('td').length
          let aa = []
          for (var i = 0; i < siz; i++) {
            let cl = te2($2('tr').find('td').eq(i).text().trim() + "+").join("\n")
            aa.push(cl)
          }
          let fil = aa.filter(function(el) {
            return (el != null && el != '' && el.substring(0,1) != "*");
          });
          for (var i = 0; i < fil.length; i++) {
            let nfil = fil[i];
            nfil = nfil.slice(0, -1)
            fil[i] = nfil
          }
          message.channel.send(fil[2])
          message.channel.send(fil[3])
          if (aw) {
            message.channel.send("--------------")
            message.channel.send(fil[6])
            message.channel.send(fil[7])
          }
        }
        else if (aw) {
          let $2 = cheerio.load(elem)
          let siz = $2('tr').find('td').length
          let aa = []
          for (var i = 0; i < siz; i++) {
            let cl = te2($2('tr').find('td').eq(i).text().trim() + "+").join("\n")
            aa.push(cl)
          }
          let fil = aa.filter(function(el) {
            return (el != null && el != '' && el.substring(0,1) != "*");
          });
          for (var i = 0; i < fil.length; i++) {
            let nfil = fil[i];
            nfil = nfil.slice(0, -1)
            fil[i] = nfil
          }
          message.channel.send(fil[2])
          message.channel.send(fil[3])
        }
      }
    })
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
