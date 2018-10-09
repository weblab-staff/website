const main = require('./config.json');
const winners = require('./winners.json');
const sponsors = require('./sponsors.json');
const team = require('./team.json');

var exports = {
    ...main,
    winners: {...winners},
    sponsors: {...sponsors},
    team: {...team},
}

module.exports = exports;
