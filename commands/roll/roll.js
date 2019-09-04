const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
var he = require('he');
const random = require('random')
var black = require('../../roll/black.js').black;
var plat = require('../../roll/plat.js').plat;
var gold = require('../../roll/gold.js').gold;
var sil = require('../../roll/sil.js').sil;
var iblack = require('../../roll/iblack.js').iblack;
var iplat = require('../../roll/iplat.js').iplat;
var igold = require('../../roll/igold.js').igold;
var isil = require('../../roll/isil.js').isil;
var pugblack = require('../../roll/pugblack.js').pugblack;
var pugplat = require('../../roll/pugplat.js').pugplat;
var bannerblack = require('../../roll/bannerblack.js').bannerblack;
var bannerplat = require('../../roll/bannerplat.js').bannerplat;
var bannergold = require('../../roll/bannergold.js').bannergold;
var bannersil = require('../../roll/bannersil.js').bannersil;
var eventblack = require('../../roll/eventblack.js').eventblack;
var eventplat = require('../../roll/eventplat.js').eventplat;
var eventgold = require('../../roll/eventgold.js').eventgold;
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
const Canvas = require('canvas');
var fs = require('fs');

const xy = [ [ 0, 0 ], [ 100, 0 ], [ 200, 0 ], [ 300, 0 ], [ 400, 0 ], [ 0, 100 ], [ 100, 100 ], [ 200, 100 ], [ 300, 100 ], [ 400, 100 ] ]






class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'roll',
		aliases: ['pull', 'gacha', 'draw'],
            	group: 'roll',
            	memberName: 'roll',
            	description: 'gacha stimulator',
		examples: ['&roll'],
		args: [{
		    key: 'text',
			prompt: 'What pool do you want to pull from?',
		    type: 'string',
		default: "default"
		}]
        });
    }

    async run(message, { text }) {
	    	const user = new Keyv(process.env.MONGODB_URI, { namespace: 'user' });
	    user.on('error', err => console.error('Keyv connection error:', err));
	    const lastroll = new Keyv(process.env.MONGODB_URI, { namespace: 'lastroll' });
	    lastroll.on('error', err => console.error('Keyv connection error:', err));
      var uuser = await user.get(message.author.id)
      var lr = []
      if (uuser == undefined) {uuser = [150, 10, 33]}
	    var usc = uuser[0]
	    var upp = uuser[1]
	    var upb = uuser[2]
		var pool = text.toLowerCase();
		var r10 = false;
	    var scu = 5;
		if (pool == "10" || pool == "10x" || pool == "x10") {
			r10 = true;
			pool = "default"
			scu = 50;
		}
		else if (pool.substr(pool.length - 2) == "10") {
			r10 = true;
			pool = pool.slice(0, -2).trim()
			scu = 50;
		}
	    	else if (pool.substr(pool.length - 3) == "x10" || pool.substr(pool.length - 3) == "10x") {
			r10 = true;
			pool = pool.slice(0, -3).trim()
			scu = 50
		}
		var embed = new Discord.RichEmbed()
		const canvas = Canvas.createCanvas(500, 200);
		const ctx = canvas.getContext('2d');
		if (pool == "event" || pool == "ev") { scu = scu * 4 / 5}
		if (usc < scu) {message.reply("You need " + scu + " SC\nYou only have " + usc + " SC")}
		else if (pool == "default") {
			usc = usc - scu;
			embed.setTitle("Gacha Roll Result")
			if (!r10) {
				if (upb == 1) {
					var ind = random.int(1, size_dict(black))
					var unit = black[ind]
					embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
					embed.setColor([95, 64, 0])
					if (upp > 1) { upp = upp -1}
					upb = 33
				}
				else if (upp == 1) {
					var rar = random.int(1, 100)
					if (rar < 4) {
						var ind = random.int(1, size_dict(black))
						var unit = black[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else {
						var ind = random.int(1, size_dict(plat))
						var unit = plat[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
						embed.setColor('GREEN')
						upp = 10
						upb = upb - 1;
					}
				}
				else {
					var rar = random.int(1, 100)
					if (rar < 4) {
						var ind = random.int(1, size_dict(black))
						var unit = black[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (rar < 14) {
						var ind = random.int(1, size_dict(plat))
						var unit = plat[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
						embed.setColor('GREEN')
						upp = 10
						upb = upb - 1;
					}
					else if (rar < 64) {
						var ind = random.int(1, size_dict(gold))
						var unit = gold[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
						embed.setColor('GOLD')
						upb = upb - 1;
						upp = upp -1;
					}
					else {
						var ind = random.int(1, size_dict(sil))
						var unit = sil[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
						embed.setColor('WHITE')
						upb = upb - 1;
						upp = upp -1;
					}
				}
				lr.push(unit)
				var img
				var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
				request(link, function(err, resp, html) {
					if (!err) {
						const $ = cheerio.load(html);
						img = $('.fullImageLink a').attr('href')
						embed.setImage(img)
						embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
						message.channel.send(embed)
					}
				})
				
			}
			if (r10) {
				embed.setColor([95, 64, 0])
				var rar 
				embed.setDescription("<@" + message.author.id + "> You rolled ")
				for (var i = 1; i < 11; i++) {
					if (upb == 1) {
						var ind = random.int(1, size_dict(black))
						var unit = black[ind]
						embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(1, size_dict(black))
							var unit = black[ind]
							embed.addField("Roll " + i, unit + " (6*)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var ind = random.int(1, size_dict(plat))
							var unit = plat[ind]
							embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(1, size_dict(black))
							var unit = black[ind]
							embed.addField("Roll " + i, unit + " (6*)", true)
							if (upp > 1) { upp = upp -1}
						upb = 33
						}
						else if (rar < 14) {
							var ind = random.int(1, size_dict(plat))
							var unit = plat[ind]
							embed.addField("Roll " + i, unit + " (5*)", true)
							upp = 10
						upb = upb - 1;
						}
						else if (rar < 64) {
							var ind = random.int(1, size_dict(gold))
							var unit = gold[ind]
							embed.addField("Roll " + i, unit + " (4*)", true)
							upb = upb - 1;
							upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(sil))
							var unit = sil[ind]
							embed.addField("Roll " + i, unit + " (3*)", true)
							upb = upb - 1;
							upp = upp -1;
						}
					}
					lr.push(unit)
				}
				embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
				send10(message, lr, embed, 0, canvas, ctx)
			}
		}
	    else if (pool == "event" || pool == "ev") {
			usc = usc - scu;
			embed.setTitle("Event Gacha Roll Result")
			if (!r10) {
				if (upb == 1) {
					var ind = random.int(1, size_dict(eventblack))
					var unit = eventblack[ind]
					embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
					embed.setColor([95, 64, 0])
					if (upp > 1) { upp = upp -1}
					upb = 33
				}
				else if (upp == 1) {
					var rar = random.int(1, 100)
					if (rar < 4) {
						var ind = random.int(1, size_dict(eventblack))
						var unit = eventblack[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else {
						var ind = random.int(1, size_dict(eventplat))
						var unit = eventplat[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
						embed.setColor('GREEN')
						upp = 10
						upb = upb - 1;
					}
				}
				else {
					var rar = random.int(1, 100)
					if (rar < 4) {
						var ind = random.int(1, size_dict(eventblack))
						var unit = eventblack[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (rar < 14) {
						var ind = random.int(1, size_dict(eventplat))
						var unit = eventplat[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
						embed.setColor('GREEN')
						upp = 10
						upb = upb - 1;
					}
					else if (rar < 64) {
						var ind = random.int(1, size_dict(eventgold))
						var unit = eventgold[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
						embed.setColor('GOLD')
						upb = upb - 1;
						upp = upp -1;
					}
					else {
						var ind = random.int(1, size_dict(sil))
						var unit = sil[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
						embed.setColor('WHITE')
						upb = upb - 1;
						upp = upp -1;
					}
				}
				lr.push(unit)
				var img
				var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
				request(link, function(err, resp, html) {
					if (!err) {
						const $ = cheerio.load(html);
						img = $('.fullImageLink a').attr('href')
						embed.setImage(img)
						embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
						message.channel.send(embed)
					}
				})
				
			}
			if (r10) {
				embed.setColor([95, 64, 0])
				var rar 
				embed.setDescription("<@" + message.author.id + "> You rolled ")
				for (var i = 1; i < 11; i++) {
					if (upb == 1) {
						var ind = random.int(1, size_dict(eventblack))
						var unit = eventblack[ind]
						embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(1, size_dict(eventblack))
							var unit = eventblack[ind]
							embed.addField("Roll " + i, unit + " (6*)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var ind = random.int(1, size_dict(eventplat))
							var unit = eventplat[ind]
							embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(1, size_dict(eventblack))
							var unit = eventblack[ind]
							embed.addField("Roll " + i, unit + " (6*)", true)
							if (upp > 1) { upp = upp -1}
						upb = 33
						}
						else if (rar < 14) {
							var ind = random.int(1, size_dict(eventplat))
							var unit = eventplat[ind]
							embed.addField("Roll " + i, unit + " (5*)", true)
							upp = 10
						upb = upb - 1;
						}
						else if (rar < 64) {
							var ind = random.int(1, size_dict(eventgold))
							var unit = eventgold[ind]
							embed.addField("Roll " + i, unit + " (4*)", true)
							upb = upb - 1;
							upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(sil))
							var unit = sil[ind]
							embed.addField("Roll " + i, unit + " (3*)", true)
							upb = upb - 1;
							upp = upp -1;
						}
					}
					lr.push(unit)
				}
				embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
				send10(message, lr, embed, 0, canvas, ctx)
			}
		}
	    else if (pool == "imperial" || pool == "white empire" || pool == "we") {
		    usc = usc - scu;
			embed.setTitle("Imperial Gacha Roll Result")
			if (!r10) {
				if (upb == 1) {
					var ind = random.int(1, size_dict(iblack))
					var unit = iblack[ind]
					embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
					embed.setColor([95, 64, 0])
					if (upp > 1) { upp = upp -1}
					upb = 33
				}
				else if (upp == 1) {
					var rar = random.int(1, 100)
					if (rar < 4) {
						var ind = random.int(1, size_dict(iblack))
						var unit = iblack[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else {
						var ind = random.int(1, size_dict(iplat))
						var unit = iplat[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
						embed.setColor('GREEN')
						upp = 10
						upb = upb - 1;
					}
				}
				else {
					var rar = random.int(1, 100)
					if (rar < 4) {
						var ind = random.int(1, size_dict(iblack))
						var unit = iblack[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (rar < 14) {
						var ind = random.int(1, size_dict(iplat))
						var unit = iplat[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
						embed.setColor('GREEN')
						upp = 10
						upb = upb - 1;
					}
					else if (rar < 64) {
						var ind = random.int(1, size_dict(igold))
						var unit = igold[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
						embed.setColor('GOLD')
						upb = upb - 1;
						upp = upp -1;
					}
					else {
						var ind = random.int(1, size_dict(isil))
						var unit = isil[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
						embed.setColor('WHITE')
						upb = upb - 1;
						upp = upp -1;
					}
				}
				lr.push(unit)
				var img
				var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
				request(link, function(err, resp, html) {
					if (!err) {
						const $ = cheerio.load(html);
						img = $('.fullImageLink a').attr('href')
						embed.setImage(img)
						embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
						message.channel.send(embed)
					}
				})
			}
			if (r10) {
				embed.setColor([95, 64, 0])
				var rar 
				embed.setDescription("<@" + message.author.id + "> You rolled ")
				for (var i = 1; i < 11; i++) {
					if (upb == 1) {
						var ind = random.int(1, size_dict(iblack))
							var unit = iblack[ind]
						embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(1, size_dict(iblack))
							var unit = iblack[ind]
							embed.addField("Roll " + i, unit + " (6*)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var ind = random.int(1, size_dict(iplat))
							var unit = iplat[ind]
							embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(1, size_dict(iblack))
							var unit = iblack[ind]
							embed.addField("Roll " + i, unit + " (6*)", true)
							if (upp > 1) { upp = upp -1}
						upb = 33
						}
						else if (rar < 14) {
							var ind = random.int(1, size_dict(iplat))
							var unit = iplat[ind]
							embed.addField("Roll " + i, unit + " (5*)", true)
							upp = 10
						upb = upb - 1;
						}
						else if (rar < 64) {
							var ind = random.int(1, size_dict(igold))
							var unit = igold[ind]
							embed.addField("Roll " + i, unit + " (4*)", true)
							upb = upb - 1;
						upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(isil))
							var unit = isil[ind]
							embed.addField("Roll " + i, unit + " (3*)", true)
							upb = upb - 1;
						upp = upp -1;
						}
					}
					lr.push(unit)
				}
				embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
				send10(message, lr, embed, 0, canvas, ctx)
			}
		}
		else if (pool == "pug" || pool == "pick-up" || pool == "pickup") {
			if (gachalist["pugopen"] == true) {
				usc = usc - scu;
				embed.setTitle("Pick-Up Gacha Roll Result")
				if (!r10) {
					if (upb == 1) {
						var ind = random.int(0, pugblack.length - 1)
							var unit = pugblack[ind]
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(0, pugblack.length - 1)
							var unit = pugblack[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var ind = random.int(0, pugplat.length - 1)
							var unit = pugplat[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var ind = random.int(0, pugblack.length - 1)
							var unit = pugblack[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (rar < 14) {
							var ind = random.int(0, pugplat.length - 1)
							var unit = pugplat[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
						else if (rar < 64) {
							var ind = random.int(1, size_dict(gold))
							var unit = gold[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
							embed.setColor('GOLD')
							upb = upb - 1;
							upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(sil))
							var unit = sil[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
							embed.setColor('WHITE')
							upb = upb - 1;
							upp = upp -1;
						}
					}
					lr.push(unit)
					var img
					var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
					request(link, function(err, resp, html) {
						if (!err) {
							const $ = cheerio.load(html);
							img = $('.fullImageLink a').attr('href')
							embed.setImage(img)
							embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
							message.channel.send(embed)
						}
					})
				}
				if (r10) {
					embed.setColor([95, 64, 0])
					var rar 
					embed.setDescription("<@" + message.author.id + "> You rolled ")
					for (var i = 1; i < 11; i++) {
						if (upb == 1) {
							var ind = random.int(0, pugblack.length - 1)
								var unit = pugblack[ind]
							embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (upp == 1) {
							var rar = random.int(1, 100)
							if (rar < 4) {
								var ind = random.int(0, pugblack.length - 1)
								var unit = pugblack[ind]
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
								upb = 33
							}
							else {
								var ind = random.int(0, pugplat.length - 1)
								var unit = pugplat[ind]
								embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
								upp = 10
								upb = upb - 1;
							}
						}
						else {
							rar = random.int(1, 100)
							if (rar < 4) {
								var ind = random.int(0, pugblack.length - 1)
								var unit = pugblack[ind]
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
							upb = 33
							}
							else if (rar < 14) {
								var ind = random.int(0, pugplat.length - 1)
								var unit = pugplat[ind]
								embed.addField("Roll " + i, unit + " (5*)", true)
								upp = 10
							upb = upb - 1;
							}
							else if (rar < 64) {
								var ind = random.int(1, size_dict(gold))
								var unit = gold[ind]
								embed.addField("Roll " + i, unit + " (4*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
							else {
								var ind = random.int(1, size_dict(sil))
								var unit = sil[ind]
								embed.addField("Roll " + i, unit + " (3*)", true)
								upb = upb - 1;
								upp = upp -1;
							}
						}
						lr.push(unit)
					}
					embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
					send10(message, lr, embed, 0, canvas, ctx)
				}
			}
			else {message.channel.send("PUG is not available")}
		}
		else if (pool == "banner 1" || pool == "b1" || pool == "banner1" || pool == "preminum 1") {
			if (gachalist["b1open"] == true) {
				usc = usc - scu;
				embed.setTitle("Banner 1 Gacha Roll Result")
				if (!r10) {
					if (upb == 1) {
						var fea = random.int(1, 10 + 7*b1fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, b1fb.length) - 1
								var unit = b1fb[ind]
							}
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*b1fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, b1fb.length) - 1
								var unit = b1fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var fea = random.int(1, 10 + 7*b1fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, b1fp.length) - 1
								var unit = b1fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*b1fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, b1fb.length) - 1
								var unit = b1fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (rar < 14) {
							var fea = random.int(1, 10 + 7*b1fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, b1fp.length) - 1
								var unit = b1fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
						else if (rar < 64) {
							var fea = random.int(1, 10 + 7*b1fg.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannergold))
								var unit = bannergold[ind]
							}
							else {
								var ind = random.int(1, b1fg.length) - 1
								var unit = b1fg[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
							embed.setColor('GOLD')
							upb = upb - 1;
							upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(bannersil))
							var unit = bannersil[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
							embed.setColor('WHITE')
							upb = upb - 1;
							upp = upp -1;
						}
					}
					lr.push(unit)
					var img
					var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
					request(link, function(err, resp, html) {
						if (!err) {
							const $ = cheerio.load(html);
							img = $('.fullImageLink a').attr('href')
							embed.setImage(img)
							embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
							message.channel.send(embed)
						}
					})
				}
				if (r10) {
					embed.setColor([95, 64, 0])
					var rar 
					embed.setDescription("<@" + message.author.id + "> You rolled ")
					for (var i = 1; i < 11; i++) {
						if (upb == 1) {
							var fea = random.int(1, 10 + 7*b1fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, b1fb.length) - 1
									var unit = b1fb[ind]
								}
							embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (upp == 1) {
							var rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*b1fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, b1fb.length) - 1
									var unit = b1fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
								upb = 33
							}
							else {
								var fea = random.int(1, 10 + 7*b1fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, b1fp.length) - 1
									var unit = b1fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
								upp = 10
								upb = upb - 1;
							}
						}
						else {
							rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*b1fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, b1fb.length) - 1
									var unit = b1fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
							upb = 33
							}
							else if (rar < 14) {
								var fea = random.int(1, 10 + 7*b1fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, b1fp.length) - 1
									var unit = b1fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*)", true)
								upp = 10
							upb = upb - 1;
							}
							else if (rar < 64) {
								var fea = random.int(1, 10 + 7*b1fg.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannergold))
									var unit = bannergold[ind]
								}
								else {
									var ind = random.int(1, b1fg.length) - 1
									var unit = b1fg[ind]
								}
								embed.addField("Roll " + i, unit + " (4*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
							else {
								var ind = random.int(1, size_dict(bannersil))
								var unit = bannersil[ind]
								embed.addField("Roll " + i, unit + " (3*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
						}
						lr.push(unit)
					}
					embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
					send10(message, lr, embed, 0, canvas, ctx)
				}
			}
			else {message.channel.send("Banner 1 is not available")}
		}
	    else if (pool == "banner 2" || pool == "b2" || pool == "banner2" || pool == "preminum 2") {
			if (gachalist["b2open"] == true) {
				usc = usc - scu;
				embed.setTitle("Banner 2 Gacha Roll Result")
				if (!r10) {
					if (upb == 1) {
						var fea = random.int(1, 10 + 7*b2fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, b2fb.length) - 1
								var unit = b2fb[ind]
							}
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*b2fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, b2fb.length) - 1
								var unit = b2fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var fea = random.int(1, 10 + 7*b2fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, b2fp.length) - 1
								var unit = b2fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*b2fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, b2fb.length) - 1
								var unit = b2fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (rar < 14) {
							var fea = random.int(1, 10 + 7*b2fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, b2fp.length) - 1
								var unit = b2fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
						else if (rar < 64) {
							var fea = random.int(1, 10 + 7*b2fg.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannergold))
								var unit = bannergold[ind]
							}
							else {
								var ind = random.int(1, b2fg.length) - 1
								var unit = b2fg[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
							embed.setColor('GOLD')
							upb = upb - 1;
							upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(bannersil))
							var unit = bannersil[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
							embed.setColor('WHITE')
							upb = upb - 1;
							upp = upp -1;
						}
					}
					lr.push(unit)
					var img
					var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
					request(link, function(err, resp, html) {
						if (!err) {
							const $ = cheerio.load(html);
							img = $('.fullImageLink a').attr('href')
							embed.setImage(img)
							embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
							message.channel.send(embed)
						}
					})
				}
				if (r10) {
					embed.setColor([95, 64, 0])
					var rar 
					embed.setDescription("<@" + message.author.id + "> You rolled ")
					for (var i = 1; i < 11; i++) {
						if (upb == 1) {
							var fea = random.int(1, 10 + 7*b2fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, b2fb.length) - 1
									var unit = b2fb[ind]
								}
							embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (upp == 1) {
							var rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*b2fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, b2fb.length) - 1
									var unit = b2fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
								upb = 33
							}
							else {
								var fea = random.int(1, 10 + 7*b2fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, b2fp.length) - 1
									var unit = b2fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
								upp = 10
								upb = upb - 1;
							}
						}
						else {
							rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*b2fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, b2fb.length) - 1
									var unit = b2fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
							upb = 33
							}
							else if (rar < 14) {
								var fea = random.int(1, 10 + 7*b2fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, b2fp.length) - 1
									var unit = b2fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*)", true)
								upp = 10
							upb = upb - 1;
							}
							else if (rar < 64) {
								var fea = random.int(1, 10 + 7*b2fg.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannergold))
									var unit = bannergold[ind]
								}
								else {
									var ind = random.int(1, b2fg.length) - 1
									var unit = b2fg[ind]
								}
								embed.addField("Roll " + i, unit + " (4*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
							else {
								var ind = random.int(1, size_dict(bannersil))
								var unit = bannersil[ind]
								embed.addField("Roll " + i, unit + " (3*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
						}
						lr.push(unit)
					}
					embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
					send10(message, lr, embed, 0, canvas, ctx)
				}
			}
			else {message.channel.send("Banner 2 is not available")}
		}
	    else if (pool == "seasonal 1" || pool == "seasonal1" || pool == "s1") {
			if (gachalist["s1open"] == true) {
				usc = usc - scu;
				embed.setTitle("Seasonal 1 Gacha Roll Result")
				if (!r10) {
					if (upb == 1) {
						var fea = random.int(1, 10 + 7*s1fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, s1fb.length) - 1
								var unit = s1fb[ind]
							}
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*s1fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, s1fb.length) - 1
								var unit = s1fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var fea = random.int(1, 10 + 7*s1fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, s1fp.length) - 1
								var unit = s1fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*s1fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, s1fb.length) - 1
								var unit = s1fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (rar < 14) {
							var fea = random.int(1, 10 + 7*s1fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, s1fp.length) - 1
								var unit = s1fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
						else if (rar < 64) {
							var fea = random.int(1, 10 + 7*s1fg.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannergold))
								var unit = bannergold[ind]
							}
							else {
								var ind = random.int(1, s1fg.length) - 1
								var unit = s1fg[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
							embed.setColor('GOLD')
							upb = upb - 1;
							upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(bannersil))
							var unit = bannersil[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
							embed.setColor('WHITE')
							upb = upb - 1;
							upp = upp -1;
						}
					}
					lr.push(unit)
					var img
					var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
					request(link, function(err, resp, html) {
						if (!err) {
							const $ = cheerio.load(html);
							img = $('.fullImageLink a').attr('href')
							embed.setImage(img)
							embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
							message.channel.send(embed)
						}
					})
				}
				if (r10) {
					embed.setColor([95, 64, 0])
					var rar 
					embed.setDescription("<@" + message.author.id + "> You rolled ")
					for (var i = 1; i < 11; i++) {
						if (upb == 1) {
							var fea = random.int(1, 10 + 7*s1fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, s1fb.length) - 1
									var unit = s1fb[ind]
								}
							embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (upp == 1) {
							var rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*s1fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, s1fb.length) - 1
									var unit = s1fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
								upb = 33
							}
							else {
								var fea = random.int(1, 10 + 7*s1fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, s1fp.length) - 1
									var unit = s1fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
								upp = 10
								upb = upb - 1;
							}
						}
						else {
							rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*s1fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, s1fb.length) - 1
									var unit = s1fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
							upb = 33
							}
							else if (rar < 14) {
								var fea = random.int(1, 10 + 7*s1fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, s1fp.length) - 1
									var unit = s1fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*)", true)
								upp = 10
							upb = upb - 1;
							}
							else if (rar < 64) {
								var fea = random.int(1, 10 + 7*s1fg.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannergold))
									var unit = bannergold[ind]
								}
								else {
									var ind = random.int(1, s1fg.length) - 1
									var unit = s1fg[ind]
								}
								embed.addField("Roll " + i, unit + " (4*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
							else {
								var ind = random.int(1, size_dict(bannersil))
								var unit = bannersil[ind]
								embed.addField("Roll " + i, unit + " (3*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
						}
						lr.push(unit)
					}
					embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
					send10(message, lr, embed, 0, canvas, ctx)
				}
			}
			else {message.channel.send("Seasonal 1 is not available")}
		}
		else if (pool == "seasonal 2" || pool == "seasonal2" || pool == "s2") {
			if (gachalist["s2open"] == true) {
				usc = usc - scu;
				embed.setTitle("Seasonal 2 Gacha Roll Result")
				if (!r10) {
					if (upb == 1) {
						var fea = random.int(1, 10 + 7*s2fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, s2fb.length) - 1
								var unit = s2fb[ind]
							}
						embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*) (Pity Black)")
						embed.setColor([95, 64, 0])
						if (upp > 1) { upp = upp -1}
						upb = 33
					}
					else if (upp == 1) {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*s2fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, s2fb.length) - 1
								var unit = s2fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else {
							var fea = random.int(1, 10 + 7*s2fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, s2fp.length) - 1
								var unit = s2fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*) (Pity Plat)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
					}
					else {
						var rar = random.int(1, 100)
						if (rar < 4) {
							var fea = random.int(1, 10 + 7*s2fb.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerblack))
								var unit = bannerblack[ind]
							}
							else {
								var ind = random.int(1, s2fb.length) - 1
								var unit = s2fb[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (6*)")
							embed.setColor([95, 64, 0])
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (rar < 14) {
							var fea = random.int(1, 10 + 7*s2fp.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannerplat))
								var unit = bannerplat[ind]
							}
							else {
								var ind = random.int(1, s2fp.length) - 1
								var unit = s2fp[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (5*)")
							embed.setColor('GREEN')
							upp = 10
							upb = upb - 1;
						}
						else if (rar < 64) {
							var fea = random.int(1, 10 + 7*s2fg.length)
							if (fea < 11) {
								var ind = random.int(1, size_dict(bannergold))
								var unit = bannergold[ind]
							}
							else {
								var ind = random.int(1, s2fg.length) - 1
								var unit = s2fg[ind]
							}
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (4*)")
							embed.setColor('GOLD')
							upb = upb - 1;
							upp = upp -1;
						}
						else {
							var ind = random.int(1, size_dict(bannersil))
							var unit = bannersil[ind]
							embed.setDescription("<@" + message.author.id + "> You rolled " + unit + " (3*)")
							embed.setColor('WHITE')
							upb = upb - 1;
							upp = upp -1;
						}
					}
					lr.push(unit)
					var img
					var link = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
					request(link, function(err, resp, html) {
						if (!err) {
							const $ = cheerio.load(html);
							img = $('.fullImageLink a').attr('href')
							embed.setImage(img)
							embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
							message.channel.send(embed)
						}
					})
				}
				if (r10) {
					embed.setColor([95, 64, 0])
					var rar 
					embed.setDescription("<@" + message.author.id + "> You rolled ")
					for (var i = 1; i < 11; i++) {
						if (upb == 1) {
							var fea = random.int(1, 10 + 7*s2fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, s2fb.length) - 1
									var unit = s2fb[ind]
								}
							embed.addField("Roll " + i, unit + " (6*) (Pity)", true)
							if (upp > 1) { upp = upp -1}
							upb = 33
						}
						else if (upp == 1) {
							var rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*s2fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, s2fb.length) - 1
									var unit = s2fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
								upb = 33
							}
							else {
								var fea = random.int(1, 10 + 7*s2fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, s2fp.length) - 1
									var unit = s2fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*) (Pity)", true)
								upp = 10
								upb = upb - 1;
							}
						}
						else {
							rar = random.int(1, 100)
							if (rar < 4) {
								var fea = random.int(1, 10 + 7*s2fb.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerblack))
									var unit = bannerblack[ind]
								}
								else {
									var ind = random.int(1, s2fb.length) - 1
									var unit = s2fb[ind]
								}
								embed.addField("Roll " + i, unit + " (6*)", true)
								if (upp > 1) { upp = upp -1}
							upb = 33
							}
							else if (rar < 14) {
								var fea = random.int(1, 10 + 7*s2fp.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannerplat))
									var unit = bannerplat[ind]
								}
								else {
									var ind = random.int(1, s2fp.length) - 1
									var unit = s2fp[ind]
								}
								embed.addField("Roll " + i, unit + " (5*)", true)
								upp = 10
							upb = upb - 1;
							}
							else if (rar < 64) {
								var fea = random.int(1, 10 + 7*s2fg.length)
								if (fea < 11) {
									var ind = random.int(1, size_dict(bannergold))
									var unit = bannergold[ind]
								}
								else {
									var ind = random.int(1, s2fg.length) - 1
									var unit = s2fg[ind]
								}
								embed.addField("Roll " + i, unit + " (4*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
							else {
								var ind = random.int(1, size_dict(bannersil))
								var unit = bannersil[ind]
								embed.addField("Roll " + i, unit + " (3*)", true)
								upb = upb - 1;
							upp = upp -1;
							}
						}
						lr.push(unit)
					}
					embed.setFooter('Pity Plat: ' + upp + ' Pity Black: ' + upb + "\nYou have " + usc + " SC left");
					send10(message, lr, embed, 0, canvas, ctx)
				}
			}
			else {message.channel.send("Seasonal 2 is not available")}
		}
		else {
			lr = await lastroll.get(message.author.id)
			message.channel.send("Wrong Input")
		}
	    uuser = [usc, upp, upb]
		await user.set(message.author.id, uuser)
		await lastroll.set(message.author.id, lr)
	}
}
function size_dict(d){
	c=0; 
	for (i in d) ++c;
	return c
}
async function send10(message, lr, embed, ind, canvas, ctx) {
	if (ind < 10) {
		var unit = lr[ind]
		var link2 = "https://aigis.fandom.com/wiki/File:" + urlencode(unit) + "_Icon.png";
		request(link2, function(err, resp, html) {
			if (!err) {
				const $2 = cheerio.load(html);
				var ilink = $2('.fullImageLink a').attr('href')
				var options = {
					uri: ilink,
					method: "get",
					encoding: null
				};
				request(options, function (error, response, body) {
					if (error) {
					} 
					else {
						var img = new Canvas.Image();
						img.src = body;
						ctx.drawImage(img, xy[ind][0], xy[ind][1], 100, 100)
						send10(message, lr, embed, ind + 1, canvas, ctx)
					}
				})
			}
		})
	}
	else {
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'unknown.png');
		embed.attachFile(attachment)
		embed.setImage('attachment://unknown.png');
		message.channel.send(embed);
	}
}
module.exports = RanRoll;
