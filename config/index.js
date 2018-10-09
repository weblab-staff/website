const main = require('./config.json');
const winners = require('./winners.json');
const sponsors = require('./sponsors.json');

var exports = {
    ...main,
    winners: {...winners},
    sponsors: {...sponsors},
}

module.exports = exports;
