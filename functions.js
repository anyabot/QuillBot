var name = require('./library/lib.js').name;
var suffix = require('./library/suf.js').suffix;
require('@gouch/to-title-case')

exports.nameChange = function nameChange(text) {
        var unit = text.toLowerCase().toTitleCase();
	    var np = unit.split(' ');
	    var npl = np.length;
	    if (npl >= 2) {
	    	if (suffix[np[npl-1]]) {
				np[npl-1] = suffix[np[npl-1]]
				let sur = np[npl-1]
				np.pop()
				let un = np.join(' ')
				if (name[un]) {un = name[un]}
				unit = un + ' ' + sur
			}
	    	if (np[npl-1] == 'Year' && np[npl-2] == 'New') {
				let sur = '(New Year\'s)'
				np.pop()
				np.pop()
				let un = np.join(' ')
				if (name[un]) {un = name[un]}
				unit = un + ' ' + sur
			}
		    if (np[npl-1] == 'Year)' && np[npl-2] == '(New') {
				let sur = '(New Year\'s)'
				np.pop()
				np.pop()
				let un = np.join(' ')
				if (name[un]) {un = name[un]}
				unit = un + ' ' + sur
			}
	    }
        if (name[unit]) unit = name[unit];
		return unit
}

