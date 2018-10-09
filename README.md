# web.lab splash page generator

## table of contents

- [getting started](#getting-started)
- [building and running](#building-and-running)
- [deploying code](#deploying-code)
- [yearly site updates](#yearly-site-updates)

more detailed documentation about the site organization:

- [directory structure](#directory-structure)
- [website config](#website-config)
- [google calendar config](#google-calendar-config)
- [editing content](#editing-content)
  - [dates](#dates-configdatejson)
  - [index](#index-srcviewscontentindexpug)
  - [about](#about-srcviewscontentaboutpug)
  - [contest articles](#about-contest-articles-srcviewscontentcontestpug)
  - [schedule](#schedule-srcviewscontentschedulepug)
  - [team](#team-configteamjson)
  - [winners](#winners-configwinnersjson)
  - [FAQ](#FAQ-srcviewscontentfaqpug)

## getting started

download all dependencies including dev

```
$ npm install
```

## building and running

```
$ gulp stream
```

view at `localhost:8080`

## deploying code

to generate static code, and set up on athena locker

clone the repo anywhere, and then:

```
$ gulp
$ ln -s $PWD/build /path/to/serve/to
```

## directory structure

on the top level, code is separated as either source (`src`), built html files based on source (`build`), scripts for generating dynamic content (`scripts`), config files used to generate built content (`config`), and deploy/build files such as `gulpfile.js`.

in `src`, files are separated as such:

```
src/
  ├── public/
  |   ├── fonts/
  |   └── img/
  ├── scss/
  |   ├── components/
  |   └── pages/
  ├── views/
  |   ├── components/
  |   └── content/
  └── favicon.ico
```

- `public/` contains fonts, images, and frontend javascript
- `scss/` contains styling files modularized into directories by the `page/` they style or by the `components/` they style
  - `_base.scss` overwrites some of the basic html tag styles such as `h1`
  - `_theme.scss` contains font imports and declares variables for theme colors, i.e. `$primary-accent: #396dff;`
  - `main.scss` imports all the style sheets
- `views/` contains pug files for all the files. files at the base of `views/` are separated by page.
  - `content/` holds supporting pug files with content for their corresponding page. `content/articles/` contains markdown articles imported into content.
  - `components/` contains supporting pug files such as the `navbar.pug` and the template `layout.pug`

## website config

the website should be maintainable with minimal modification to the actual code.
most important values are specified in the `config` directory

## google calendar config

all events in our calendar must follow this format in the description:

for lectures, the first line should be the name of the lecturer.

specify type as follows (lec by default):

```
type: lec
type: oh
type: event
type: milestone
type: block
```

links can be provided as follows:

```
slides 1: link_to_pdf
slides 2: link_to_pdf
youtube: link_to_youtube
info: link_to_something_else
```

if no type is explicitly provided, the website will infer based on the title (e.g. contains 'lunch', 'milestone', 'office hours')

to make an event with an instantaneous time (e.g. milestone due at 11:59am), set the calendar entry to start and end at the same time (e.g. 11:59am - 11:59am)

## yearly site updates

TODO: explain what needs to be changed from year to year and point to the section explaining how to make those changes


## editing content

content files for editing are all contained in `src/views/content/`. you do not need to touch any of the pug files at the top level of `src/views/`. you will be updating the content of the mixins in these files. this section is split up into pages and what can be updated/how to update components on each page.

### dates (`config/date.json`)

contains strings for dates used throughout the site

- **startDev**
  - date when teams can start developing
  - used in: `contest.pug` > `rules_article()` (about page)
- **finalSubmission**
  - date and time of when final submission is due
  - used in: `contest.pug` (about page)
- **semifinalist**
  - date and time range for when semifinalist presentations will occur
  - used in `contest.pug` > `judging_article()` (about page)
- **luncheon**
  - date and time of the finalist luncheons
  - used in `contest.pug` > `judging_article()` (about page)

### index (`src/views/content/index.pug`)

content on the homepage

- **welcome_blurb()**
  - contains the description below "welcome to web.lab". `</br>` tags are needed to specifically separate into
- **join_mailing_list**
  - is the button below the welcome description. as of 2018, it links to a google form
- **carasol_feature()**
  - is no longer used. it has been replaced by the graphic on the right of the welcome blurb
- **feature_projects(num)**
  - populates the "what people think" section. update the features array to change feature images, quotes, and text
- **thank_sponsor_subtitle()**
  - is the text below the header "thanks to our sponsors"
- **sponsors()**
  - can be updated by adding objects to the array `sponsors`. each array should be formatted as such `{name: "", path: "TO/IMG.png", link: "http://", level: ""}`.

### about (`src/views/content/about.pug`)

contains the generic content on the about page, as well as structures/adds in articles

- **header()**
  - contains the text in the header of the page
- **sidebar()**
  - generates the sidebar. when a new article is added or one is removed, the sidebar needs to be updated to add/remove a link to that article
- **articles()**
  - these are the various sections on this page, or articles. the content in these articles is either a markdown file in `articles/` or is a mixin in `contest.pug`

### contest articles (`src/views/content/contest.pug`)

various articles/content about the contest that cannot be formatted in markdown

- **rules_article()**
  - contains the contest rules and their details. each rule is numbered (`.num`) and has a brief description.
  - for longer rules, a `.details` section is included whose visibility can be toggled. a `span` of text in the general `.rule` description is designated to toggle `.details` by matching html id.
- **judging_article()**
  - contains a generic rubric of what judging will look for in projects.
  - similar to rules, more details for each rubric category can be toggled by the user and uses a `span` of text in the `.descript` to toggle a `.details` section by specific html id.

### schedule (`src/views/content/schedule.pug`)

file full of helper mixins that parse the `calendar.json` file. see [here](#google-calendar-config) to change the schedule and [redeploy](#deploying-code) the site to update.

### team (`config/team.json`)

file parsed to make up team page. to edit text in the header go to `src/views/content/team.pug`.

note that all team member names will display _lowercase_ no matter how you enter it in the json.

members of the **current** team are in the list under the key `current`. each member's object is formatted as follows

```
{
  "firstName": "Boaty",
  "lastName": "McBoatFace",
  "position": "boat",
  "img": "boat.png"
}
```

the image referenced should be in `src/public/img/staff/current`.

**alums** are in the list under the key `alums`. each member's object is formatted as follows

```
{
  "firstName": "Boaty",
  "lastName": "McBoatFace",
  "year": "2016",
  "img": "boat.png"
}
```

the image referenced should be in `src/public/img/staff/alums`.

### winners (`config/winners.json`)

file parsed to make up the winners page. to edit text in the header go to `src/views/content/winners.pug`.

the `winners` json is a list of objects. each object is a previous year's competition. each year object should contain a `head` with the year and theme, i.e. "2015. around the world", and `divisions`. `divisions` is a list containing objects for each division. division objects should be formatted as follows

```
{
  "name": "DIVISION NAME",
  "winners": [...],
  "honorableMentions": [...],
  "semifinalists": [...]
}
```

`winners`, `honorableMentions`, and `semifinalists` are lists of winner objects which should be formatted as below. they can be empty.

```
{
  "place": "X place",
  "project": "NAME",
  "creators": [
    "PERSON1",
    "PERSON2"
  ]
  "descript": "BRIEF DESCRIPTION",
  "img": "LINK/TO/IMG",
  "link": "PROJECT.HEROKUAPP.COM"
}
```

note that the order of winner objects does matter and link _should not_ contain "http://" or "https://".

### FAQ (`src/views/content/faq.pug`)

contains the various questions on the faq page.

- **header()**
  - contains the text in the header of the page
- **questions()**
  - each faq question should be formatted in divs as follows

```
.question
  h2 QUESTION?
  p ANSWER
    br/
    br/
    | OPTIONALLY MORE ANSWER AFTER TWO LINE BREAKS
```
