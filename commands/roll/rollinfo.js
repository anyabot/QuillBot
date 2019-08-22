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
var s1fb = require('../../roll/s1fb.js').s1fb;
var s1fp = require('../../roll/s1fp.js').s1fp;
var s1fg = []
var s2fb = require('../../roll/s2fb.js').s2fb;
var s2fp = require('../../roll/s2fp.js').s2fp;
var s2fg = []
var gachalist = require('../../roll/gachalist.js').gachalist
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
	    var mes = "**Banner List:**\nDefault"
	    mes = mes + "\nBanner 1 (b1, banner1, preminum 1)"
	    mes = mes + "\nBanner 2 (b2, banner2, preminum 2)"
	    mes = mes + "\nPUG (pick-up, pickup)"
	    mes = mes + "\nImperial (white empire, we)"
	    mes = mes + "\nEvent (ev)"
	    
	if (gachalist["s1open"] == true) {
		    var s1 = "**Seasonal 1**"
	      if (s1fb.length > 0) {s1 = s1 + "\nFeatured Black: " + s1fb.join(', ')}
	      if (s1fp.length > 0) {s1 = s1 + "\nFeatured Plat: " + s1fp.join(', ')}
	      if (s1fg.length > 0) {s1 = s1 + "\nFeatured Gold: " + s1fg.join(', ')}  
		    mes = mes + "\n" + s1
	    }
	    if (gachalist["s2open"] == true) {
	    	var s2 = "**Seasonal 2**"
	      if (s2fb.length > 0) {s2 = s2 + "\nFeatured Black: " + s2fb.join(', ')}
	      if (s2fp.length > 0) {s2 = s2 + "\nFeatured Plat: " + s2fp.join(', ')}
	      if (s2fg.length > 0) {s2 = s2 + "\nFeatured Gold: " + s2fg.join(', ')}
		    mes = mes + "\n" + s2
	    }
	    if (gachalist["b1open"] == true) {
		    var b1 = "**Banner 1**"
	      if (b1fb.length > 0) {b1 = b1 + "\nFeatured Black: " + b1fb.join(', ')}
	      if (b1fp.length > 0) {b1 = b1 + "\nFeatured Plat: " + b1fp.join(', ')}
	      if (b1fg.length > 0) {b1 = b1 + "\nFeatured Gold: " + b1fg.join(', ')}  
		    mes = mes + "\n" + b1
	    }
	    if (gachalist["b2open"] == true) {
	    	var b2 = "**Banner 2**"
	      if (b2fb.length > 0) {b2 = b2 + "\nFeatured Black: " + b2fb.join(', ')}
	      if (b2fp.length > 0) {b2 = b2 + "\nFeatured Plat: " + b2fp.join(', ')}
	      if (b2fg.length > 0) {b2 = b2 + "\nFeatured Gold: " + b2fg.join(', ')}
		    mes = mes + "\n" + b2
	    }
	    if (gachalist["pugopen"] == true) {
	    	var pug = "**PUG**"
	      if (pugblack.length > 0) {pug = pug + "\nFeatured Black: " + pugblack.join(', ')}
	      if (pugplat.length > 0) {pug = pug + "\nFeatured Plat: " + pugplat.join(', ')}
		    mes = mes + "\n" + pug
	    }
    message.channel.send(mes)
    }
}
module.exports = RanRoll;
