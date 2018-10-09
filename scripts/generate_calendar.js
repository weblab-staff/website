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
            let start = new Date(ev.start.dateTime || ev.start.date);
            let end = new Date(ev.end.dateTime || ev.start.date);
            let day = start.getDate() + (start.getMonth() * 31); // assumes only jan/feb

            let time = '11:59PM'; // default if no time given
            if (ev.start.dateTime) {
              time = getTime(start) + ' - ' + getTime(end);
            }

            let who;
            let links = [];
            if (ev.description) {
              for (line of ev.description.split('\n')) {
                let split = line.split(':');
                if (split.length == 1) {
                  who = line; // assume line without colon is the lecturer
                } else {
                  let type = 'info';
                  if (split[0].toLowerCase().indexOf('youtube') > -1) {
                    type = 'youtube';
                  } else if (split[0].toLowerCase().indexOf('slides') > -1) {
                    type = 'pdf';
                  }

                  links.push({
                    type: type,
                    name: split[0].trim(),
                    link: split.slice(1).join(':').trim()
                  });
                }
              }
            }

            // this block is going to change when we figure out a better way to set type
            let type = 'event';
            if (ev.start.date) {
              type = 'milestone'; //assume all 'full-day' things are milestones
            } else if (ev.summary.toLowerCase().indexOf('lunch') > -1) {
              type = 'block';
            } else if (ev.summary.toLowerCase().indexOf('office hours') > -1) {
              type = 'oh';
            } else if (ev.description && ev.description.split('\n')[0].indexOf(':') == -1) {
              type = 'lec'; //sketchy temporary check: there is a lecturer on the first line
            }

            let entry = {
              type: type,
              name: ev.summary,
              who: who,
              when: time,
              where: ev.location,
              timestamp: start, // js-friendly time for sorting purposes
              links: links
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
