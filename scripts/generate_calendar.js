const https = require('https');
const config = require('../config.json');
const fs = require('fs');

function getTime (date) {
  let h = date.getHours();
  let m = date.getMinutes();

  let period = (h < 12) ? 'AM' : 'PM'
  if (!h) {
    h = 12;
  } else {
    h -= 12 * (h > 12);
  }

  // precede with 0 if needed
  h = ('0' + h).slice(-2);
  m = ('0' + m).slice(-2);

  return `${h}:${m}${period}`;
}

var exports = {
  generate: function() {
    return new Promise((resolve, reject) => {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${config.calendarId}/events?key=${config.googleApiKey}`;

      https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          let res = JSON.parse(data);
          let output = {};

          for (ev of res.items) {
            let entry = { // individual calendar entry
              name: ev.summary,
              type: 'lec',
              where: ev.location,
              links: []
            }

            let start = new Date(ev.start.dateTime || ev.start.date);
            let end = new Date(ev.end.dateTime || ev.start.date);
            let day = start.getDate() + (start.getMonth() * 31); // assumes only jan/feb
            entry.timestamp = start;

            entry.time = '11:59PM'; // default if no time given
            if (ev.start.dateTime) {
              entry.time = getTime(start) + ' - ' + getTime(end);
            }

            // infer type if none explicitly given
            const title = ev.summary.toLowerCase();
            if (title.indexOf('lunch') > -1) {
              entry.type = 'block';
            } else if (title.indexOf('milestone') > -1) {
              entry.type = 'milestone';
            } else if (title.indexOf('office hours') > -1) {
              entry.type = 'oh';
            }

            if (ev.description) {
              for (line of ev.description.split('\n')) {
                let split = line.split(':');
                if (split.length == 1) {
                  entry.who = line.trim(); // assume line without colon is the lecturer
                } else {
                  const key = split[0].toLowerCase().trim();
                  const val = split[1].toLowerCase().trim();

                  if (key == "type") {
                    entry.type = val; // can always explicitly set type
                  } else {
                    entry.links.push({
                      type: key.split(" ")[0],
                      link: split.slice(1).join(':').trim()
                    });
                  }
                }
              }
            }

            if (day in output) {
              output[day].push(entry);
              output[day].sort((a, b) => a.timestamp - b.timestamp);
            } else {
              output[day] = [entry];
            }
          }

          fs.writeFileSync(__dirname + '/../src/views/content/calendar.json', JSON.stringify(output));
          resolve()
        });
      });
    });
  }
}

module.exports = exports;
