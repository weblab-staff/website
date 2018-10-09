const main = require('./config.json');
const winners = require('./winners.json');

var exports = {
    ...main,
    winners: {...winners},
}

module.exports = exports;
