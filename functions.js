// capitalize
exports.toTitleCase = function toTitleCase(str) {
    return str.replace(/(?![of])(\w+)('s)?('u)?/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

