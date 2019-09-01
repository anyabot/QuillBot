const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Keyv = require('keyv');
require('@keyv/mysql')
require('@keyv/mongo')



class RanRoll extends commando.Command {
    constructor(client) {
        super(client, {
            	name: 'quizscore',
            	group: 'quiz',
            	memberName: 'quizscore',
            	description: 'number of units you have correctly guessed',
		examples: ['&quizscore'],
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
      message.reply("Number of units you have correctly guessed: " + score[message.author.id])
	}
}
module.exports = RanRoll;
