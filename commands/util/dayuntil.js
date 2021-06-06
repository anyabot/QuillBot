const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
var moment = require('moment');
var printf = require('printf');
var functions = require('../../functions.js');
require('@gouch/to-title-case')
var japname = require('../../revival/japname.js').japname;
var unum = require('../../revival/unum2.js').unum;
var ulist = require('../../revival/ulist.js').ulist;
class UtilDaily extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'dayuntil',
      aliases: ['du'],
      group: 'util2',
      memberName: 'dayuntil',
      description: 'find the number of days until the daily revival of a unit',
      examples: ['&dayuntil lin'],
    });
  }

  async run(message, input) {
    var unit = functions.nameChange(input)
    var link = "https://wikiwiki.jp/aigiszuki/"
    var link2 = "https://aigis.fandom.com/wiki/Daily_Revivals"
    if (unum[unit]) {
      request(link, function (err, resp, html) {
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
          console.log(tname)
          tname = japname[tname];
          var num1 = unum[tname];
          var num2 = unum[unit];
          console.log(num1);
          console.log(num2);
          if (num1 == num2) { message.channel.send('Today!') }
          else {
            if (num2 < num1) {
              num2 = num2 + ulist.length;
            }
            console.log(num2)
            let diff = num2 - num1;
            message.channel.send('Approximately ' + diff + ' day(s)')
          }
        }
      })
    }
    else (message.channel.send('No Data'))
  }
}
function na(output) {
  output = output.replace(/<[^>]*>/g, "\n");
  output = output.replace(/\n+ /g, "\n");
  output = he.decode(output);
  output = output.trim();
  var arr = output.split('\n');
  var filtered = arr.filter(function (el) {
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
