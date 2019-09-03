const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'myrank',
            	group: 'quiz',
            	memberName: 'myrank',
            	description: 'your ranking of quiz mini game',
		examples: ['&myrank'],
		hidden: true
        });
    }

    async run(message, input) {
	    const quiz = new Keyv(process.env.MONGODB_URI, { namespace: 'quiz' });
	    quiz.on('error', err => console.error('Keyv connection error:', err));
	    var uquiz = await quiz.get(message.author.id)
	    if (uquiz == undefined) {uquiz = []}
			var score = await quiz.get("score")
			if (score == undefined) {score = {}}
			if (!score[message.author.id]) {score[message.author.id] = 0}
		var items = Object.keys(score).map(function(key) {
			return [key, score[key]];
		});
		items.sort(function(first, second) {
			return second[1] - first[1];
		});
	    	var urank = items.length
	    	var uscore = score[message.author.id]
	    	for (var i = items.length - 1; i >= 0; i --) {
			if (items[i][0] == message.author.id) {
				urank = i + 1
			} 
			else if (items[i][1] == uscore) {urank = i - 1}
			else if (items[i][1] > uscore) {break}
		}
	    	var mes = "Your rank: " + urank
		message.reply(mes)
	}
}
module.exports = RanRoll;
