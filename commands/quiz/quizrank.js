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
            	description: 'ranking of quiz mini game',
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
      const client = new Discord.Client()
		  if (!score[message.author.id]) {score[message.author.id] = 0}
      var items = Object.keys(score).map(function(key) {
        return [key, dict[score]];
      });
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      var top = items.slice(0, 5)
      mes = ""
      for (var i = 0; i < top.length; i++) {
        user = client.fetchUser(id)
        .then((User) => {
            var un = User.username
        })
        .catch((err) => {
          console.error(err)
        })
        mes = mes + "\n" + (i+1) + ".: " +un
      }
      message.reply(mes)
	}
}
module.exports = RanRoll;
