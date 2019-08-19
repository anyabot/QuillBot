const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
const random = require('random')
var pugblack = require('../../roll/pugblack.js').pugblack;
var pugplat = require('../../roll/pugplat.js').pugplat;
var b1fb = require('../../roll/b1fb.js').b1fb;
var b1fp = require('../../roll/b1fp.js').b1fp;
var b1fg = []
var b2fb = require('../../roll/b2fb.js').b2fb;
var b2fp = require('../../roll/b2fp.js').b2fp;
var b2fg = []
var urlencode = require('urlencode');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')








class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'rollinfo',
		aliases: ['pullinfo', 'gachainfo', 'drawinfo', 'bannerinfo', 'banner'],
            	group: 'roll',
            	memberName: 'rollinfo',
            	description: 'info about banner 1/2 and pug of the gacha stimulator',
		examples: ['&roll']
        });
    }

    async run(message, input) {
	    var mes = "**Banner List:**\nDefault\nBanner 1 (b1, banner1, preminum 1)\nBanner 2 (b2, banner2, preminum 2)\nPUG (pick-up, pickup)\nImperial(white empire, we)\nEvent(ev)"
      var b1 = "**Banner 1**"
      if (b1fb.length > 0) {b1 = b1 + "\nFeatured Black: " + b1fb.join(', ')}
      if (b1fp.length > 0) {b1 = b1 + "\nFeatured Plat: " + b1fp.join(', ')}
      if (b1fg.length > 0) {b1 = b1 + "\nFeatured Gold: " + b1fg.join(', ')}
    var b2 = "**Banner 2**"
      if (b2fb.length > 0) {b2 = b2 + "\nFeatured Black: " + b2fb.join(', ')}
      if (b2fp.length > 0) {b2 = b2 + "\nFeatured Plat: " + b2fp.join(', ')}
      if (b2fg.length > 0) {b2 = b2 + "\nFeatured Gold: " + b2fg.join(', ')}
    var pug = "**PUG**"
      if (pugblack.length > 0) {pug = pug + "\nFeatured Black: " + pugblack.join(', ')}
      if (pugplat.length > 0) {pug = pug + "\nFeatured Plat: " + pugplat.join(', ')}
    mes = mes + b1 + "\n" + b2 + "\n" + pug
    message.channel.send(mes)
    }
}
module.exports = RanRoll;
