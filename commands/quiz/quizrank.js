const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'quizrank',
            	group: 'quiz',
            	memberName: 'quizrank',
            	description: 'ranking of quiz mini game',
		examples: ['&quizrank'],
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
		var top = items.slice(0, 5)
		var mes = ""
		for (var i = 0; i < top.length; i ++) {
			let user = message.client.users.get(top[i][0]);
			let un = user.username
			console.log(un)
			let rank = i + 1
			mes = mes + "\n" + rank + ".: " + un + "(" + top[i][1] + ")"
		}
		message.reply(mes)
	}
}
function getrank(top, message, i) {
	if (i = top.length) {return ""}
	else {
		var user = message.client.users.get(top[i][0]);
		var un = user.username
		console.log(un)
		return (i+1) + ".: " + un + "(" + top[i][1] + ")\n" + getrank(top, message, i + 1)
	}
}
module.exports = RanRoll;
