var gulp = require("gulp");
var pump = require("pump");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var connect = require("gulp-connect");

gulp.task("img", function(cb) {
  pump([gulp.src("src/public/img/*"), gulp.dest("public/img")], cb);
});

gulp.task("fonts", function(cb) {
  pump([gulp.src("src/public/fonts/*"), gulp.dest("public/fonts")], cb);
});

gulp.task("sass", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/css"));
});

gulp.task("pug", function buildHTML() {
  return gulp
    .src("src/views/*.pug")
    .pipe(pug())
    .pipe(gulp.dest(""));
});

gulp.task("build", ["img", "sass", "pug", "fonts"], function(cb) {
  pump([gulp.src("src/public/*.js"), gulp.dest("public/")], cb);
});

gulp.task("serve", function() {
  connect.server({
    livereload: true,
    port: 8080,
    root: ["./"]
  });
});

gulp.task("stream", ["build", "serve"], function(cb) {
  gulp.watch("src/scss/**/*.scss", ["build"]);
  gulp.watch("src/public/*.js", ["build"]);
  gulp.watch("src/views/**/*.pug", ["build"]);
});

gulp.task("default", ["build"]);
