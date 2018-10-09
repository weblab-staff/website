var gulp = require("gulp");
var pump = require("pump");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var calendar = require("./scripts/generate_calendar.js");

gulp.task("img", function(cb) {
  pump([gulp.src("src/public/img/**/*"), gulp.dest("build/public/img")], cb);
});

gulp.task("fonts", function(cb) {
  pump([gulp.src("src/public/fonts/*"), gulp.dest("build/public/fonts")], cb);
});

gulp.task("favicon", function(cb) {
  pump([gulp.src("src/favicon.ico"), gulp.dest("build")], cb);
});

gulp.task("sass", function() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("build/public/css"));
});

gulp.task("pug", ["calendar"], function() {
  return gulp
    .src("src/views/*.pug")
    .pipe(
      pug({
        // allow imports in pug files via 'require'
        locals: { require: require }
      })
    )
    .pipe(
      rename(function(path) {
        if (path.basename != "index") {
          path.dirname = path.basename;
          path.basename = "index";
        }
      })
    )
    .pipe(gulp.dest("build"));
});

gulp.task("calendar", function() {
  calendar.generate();
});

gulp.task("build", ["img", "sass", "pug", "fonts", "favicon"], function(cb) {
  pump([gulp.src("src/public/*.js"), gulp.dest("build/public/")], cb);
});

gulp.task("serve", function() {
  connect.server({
    livereload: true,
    port: 8080,
    root: ["./build"]
  });
});

gulp.task("stream", ["build", "serve"], function(cb) {
  gulp.watch("src/scss/**/*.scss", ["build"]);
  gulp.watch("src/public/*.js", ["build"]);
  gulp.watch("src/public/img/**/*", ["build"]);
  gulp.watch("src/views/**/*.pug", ["build"]);
});

gulp.task("default", ["build"]);
