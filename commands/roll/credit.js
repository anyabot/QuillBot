const commando = require('discord.js-commando');
const Discord = require('discord.js');
const random = require('random')
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')


class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'credit',
            	group: 'roll2',
              aliases: ['sc'],
            	memberName: 'credit',
            	description: 'get free 7-15 sc for the gacha stimulator once every 2 hours',
		throttling: {
		usages: 1,
		duration: 3600
	},
		examples: ['&credit']
        });
    }

    async run(message, input) {
		  const user = new Keyv(process.env.MONGODB_URI, { namespace: 'user' });
	    user.on('error', err => console.error('Keyv connection error:', err));
      var uuser = await user.get(message.author.id)
      if (uuser == undefined) {uuser = [150, 10, 33]}
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
	    var scoresc = Math.floor(uscore/100)
	    var ranksc = 0
	    if (urank == 1) {ranksc = 5}
	    else if (urank < 4) {ranksc = 3}
	    else if (urank < 6) {ranksc = 2}
	    else if (urank < 11) {ranksc = 1}
	    var usc = uuser[0]
	    var ge = random.int(7, 15)
	    usc = usc + ge + scoresc + ranksc
	    	uuser[0] = usc
		user.set(message.author.id, uuser)
      		message.reply("You got " + ge + " SC\nYou got " + scoresc + " from your quiz score (1 for every 100 units correctly guessed)\nYou got " + ranksc + " from your quiz rank (1 : 5, 2-3 : 3, 4-5 : 2, 6-10 : 1)\nYou currently have " + usc + " SC")
				
	}
}
module.exports = RanRoll;
