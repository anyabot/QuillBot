const commando = require("discord.js-commando");
const Discord = require("discord.js");
var request = require("request");
var cheerio = require("cheerio");
var he = require("he");
var name = require("../../library/lib.js").name;
var suffix = require("../../library/suf.js").suffix;
require("@gouch/to-title-case");
var urlencode = require("urlencode");
var functions = require("../../functions.js");

class FindStat2 extends commando.Command {
  constructor(client) {
    super(client, {
      name: "stat2",
      group: "find",
      memberName: "stat2",
      description: "find stats of an unit",
      examples: ["&stat2 quill"],
      args: [
        {
          key: "text",
          prompt: "What unit do you want to know about?",
          type: "string",
        },
      ],
    });
  }

  async run(message, { text }) {
    var unit = text;
    var pages = [];
    var link = "https://mist-train-girls.fandom.com/wiki/" + urlencode(unit);
    request(link, function (err, resp, html) {
      if (!err) {
        const $ = cheerio.load(html);
        var tk = $(".categories").text().includes("Train Knights");
        if (tk) {
          await (async () => {for (
            var i = 1;
            i < $(".wikitable tbody").eq(0).children().length;
            i++
          ) {
            let img = $(
              ".wikitable tbody tr:nth-child(" + (i+1).toString() + ") td:nth-child(1) a img"
            ).attr("src");
            if (!img) {
              img = $(
                ".wikitable tbody tr:nth-child(" + (i+1).toString() + ") td:nth-child(1) a img"
              ).attr("data-src");
            }
            let link2 = $(".wikitable tbody tr:nth-child(" + (i+1).toString() + ") td:nth-child(2) a").attr(
              "href"
            );
            let temp = await find_dat(link2, img)
            pages.concat(temp);
          }}).then(() => functions.sende(message, pages))
        }
      }
    });
  }
}

async function find_dat(link, img) {
  await request("https://mist-train-girls.fandom.com" + link, function (err, resp, html) {
    if (!err) {
      var pages2 = [];
      const $ = cheerio.load(html);
      var output;
      var check = false;

      output = $(".wikitable.hidden.stats tr:nth-child(4)").html();
      if (output) {
        check = true;
        let line1 = lv1line(
          $(".wikitable.hidden.stats tr:nth-child(3)").html()
        );
        console.log(line1)
        let line2 = lv1line(
          $(".wikitable.hidden.stats tr:nth-child(4)").html()
        );
        let embed = new Discord.RichEmbed()
          .setURL(link)
          .setTitle(unit + "'s Stats")
          .setThumbnail(img)
          .setColor("LIGHT_GREY")
          .addField("ATK", line1[1] + " → " + line2[1], true)
          .addField("DEF", line1[2] + " → " + line2[2], true)
          .addField("HIT", line1[3] + " → " + line2[3], true)
          .addField("SPD", line1[4] + " → " + line2[4], true)
          .addField("MATK", line1[5] + " → " + line2[5], true)
          .addField("MDEF", line1[6] + " → " + line2[6], true)
          .addField("RCV", line1[7] + " → " + line2[7], true)
          .addField("LUK", line1[8] + " → " + line2[8], true);
        pages2.push(embed);
        console.log(pages2)
      }
      output = $(".wikitable.hidden.resist tr:nth-child(2)").html();
      if (output) {
        check = true;
        let line1 = lv1line(
          $(".wikitable.hidden.resist tr:nth-child(2)").html()
        );
        let embed = new Discord.RichEmbed()
          .setURL(link)
          .setTitle(unit + "'s Resists")
          .setThumbnail(img)
          .setColor("LIGHT_GREY")
          .addField("Cut", line1[0], true)
          .addField("Blow", line1[1], true)
          .addField("Pierce", line1[2], true)
          .addField("Fire", line1[3], true)
          .addField("Water", line1[4], true)
          .addField("Wind", line1[5], true)
          .addField("Light", line1[6], true)
          .addField("Dark", line1[7], true);

        pages2.push(embed);
        console.log(pages2)
      }
      return pages2;
    }
    else {console.log(err)}
  });
}

function lv1line(output) {
  if (output != null) {
    output = output.replace(/<[^>]*>/g, "\n");
    output = output.replace(/\n+ /g, "\n");
  }
  output = he.decode(output);
  output = output.trim();
  var arr = output.split("\n");
  var filtered = arr.filter(function (el) {
    return el != null && el != "";
  });
  return filtered;
}

module.exports = FindStat2;
