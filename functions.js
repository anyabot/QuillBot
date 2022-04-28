var name = require('./library/lib.js').name;
var suffix = require('./library/suf.js').suffix;
require('@gouch/to-title-case')
const commando = require('discord.js-commando');
const Discord = require('discord.js');
exports.nameChange = function nameChange(text) {
    var unit = text.toLowerCase().toTitleCase();
    var np = unit.split(' ');
    var npl = np.length;
    if (npl >= 2) {
        if (np[0] == "Chibi" || np[0] == "C") {
            np = np.slice(1, npl)
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = "Chibi " + un
        } else if (np[npl - 1] == "Chibi" || np[npl - 1] == "C") {
            np = np.slice(0, npl - 1)
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = "Chibi " + un
        }
        if (suffix[np[npl - 1]]) {
            np[npl - 1] = suffix[np[npl - 1]]
            let sur = np[npl - 1]
            np.pop()
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[npl - 1] == 'Year' && np[npl - 2] == 'New') {
            let sur = '(New Year\'s)'
            np.pop()
            np.pop()
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[npl - 1] == 'Year)' && np[npl - 2] == '(New') {
            let sur = '(New Year\'s)'
            np.pop()
            np.pop()
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[npl - 1] == 'Springs' && np[npl - 2] == 'Hot') {
            let sur = '(Hot Springs)'
            np.pop()
            np.pop()
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[npl - 1] == 'Springs)' && np[npl - 2] == '(Hot') {
            let sur = '(Hot Springs)'
            np.pop()
            np.pop()
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (suffix[np[0]]) {
            np[0] = suffix[np[0]]
            let sur = np[0]
            np = np.slice(1, npl)
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[1] == 'Year' && np[0] == 'New') {
            let sur = '(New Year\'s)'
            np = np.slice(2, npl)
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[1] == 'Year)' && np[0] == '(New') {
            let sur = '(New Year\'s)'
            np = np.slice(2, npl)
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[1] == 'Springs' && np[0] == 'Hot') {
            let sur = '(Hot Springs)'
            np = np.slice(2, npl)
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        } else if (np[1] == 'Springs)' && np[0] == '(Hot') {
            let sur = '(Hot Springs)'
            np = np.slice(2, npl)
            let un = np.join(' ')
            if (name[un]) {
                un = name[un]
            }
            unit = un + ' ' + sur
        }
    }
    if (name[unit]) unit = name[unit];
    return unit
}

exports.sende = function sende(message, pages) {
    var embed = pages[0];
    let page = 1;
    embed = pages[0];
    embed.setFooter('Page ' + page + ' of ' + pages.length);
    if (pages.length != 1) {
        message.channel.send(embed).then(msg => {
            msg.react('⬅️').then(r => {
                msg.react('➡️')

                // Filters
                const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && !user.bot;
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && !user.bot;

                const backwards = msg.createReactionCollector(backwardsFilter, {
                    timer: 6000
                });
                const forwards = msg.createReactionCollector(forwardsFilter, {
                    timer: 6000
                });

                backwards.on('collect', (r, u) => {
					r.users.remove(u).catch(e => console.log(e))
					if (page === 1) {
						page = pages.length + 1;
					}
					page--;
					embed = pages[page - 1];
					embed.setFooter('Page ' + page + ' of ' + pages.length);
					msg.edit(embed)
				})

				forwards.on('collect', (r, u) => {
					r.users.remove(u).catch(e => console.log(e))
					if (page === pages.length) {
						page = 0;
					}
					page++;
					embed = pages[page - 1];
					embed.setFooter('Page ' + page + ' of ' + pages.length);
					msg.edit(embed)
				})
            })
        })
    } else {
        message.channel.send(embed)
    }
}
