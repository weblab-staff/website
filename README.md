# web.lab splash page generator

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
