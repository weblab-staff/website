# web.lab splash page generator

## table of contents

- [getting started](#getting-started)
- [building and running](#building-and-running)
- [deploying code](#deploying-code)
- [directory structure](#directory-structure)
- [google calendar config](#google-calendar-config)
- [editing content](#editing-content)

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

on the top level, code is separated as either source (`src`), built html files based on source (`build`), scripts for generating dynamic content (`scripts`), and config files such as `gulpfile.js`.

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

## editing content

content files for editing are all contained in `src/views/content/`.
