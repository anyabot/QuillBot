const commando = require('discord.js-commando');
const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');

class UtilDaily extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'fame',
            group: 'util2',
            memberName: 'fame',
            description: 'show weekly fame missions',
            examples: ['&fame'],
        });
    }

    async run(message, input) {
        var link = "https://aigis.fandom.com/wiki/Fame";

        request(link, function(err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                message.channel.send($('.weekly').text())
            }
        })
    }
}

module.exports = UtilDaily;
