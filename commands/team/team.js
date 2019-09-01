const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');
const random = require('random')
var urlencode = require('urlencode');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')
const Canvas = require('canvas');
var functions = require('../../functions.js');
var fs = require('fs');

class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'quiz',
            	group: 'quiz',
            	memberName: 'quiz',
            	description: 'just quiz',
		throttling: {
		usages: 1,
		duration: 60
	},
		examples: ['&quiz'],
		hidden: true
        });
    }

    async run(message, input) {
	    const canvas = Canvas.createCanvas(583, 426);
	    const ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage('../../image/unknown.png');
      ctx.drawImage(background, 0, 0)
      const attachment = new Discord.Attachment(canvas.toBuffer(), 'team.png');
	    message.channel.send(attachment);
	}
}
module.exports = RanRoll;
