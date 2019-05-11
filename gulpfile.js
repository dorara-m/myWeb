var gulp = require("gulp");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var browserSync = require("browser-sync");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var minifycss = require('gulp-clean-css');

var pug = require("gulp-pug");

var imagemin = require('gulp-imagemin');

var mozjpeg = require('imagemin-mozjpeg');


gulp.task('default', [ 'browser-sync', 'watch', 'pug', 'sass', 'jsCopy', 'images']);

// sass
gulp.task('sass', () => {
  gulp.src("./src/sass/*scss")
      .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 10', 'Android >= 5', 'ie >= 11'],
        cascade: false
      }))
      .pipe(gulp.dest("./dev/assets/styles/"))
      .pipe(minifycss())
      .pipe(gulp.dest("./www/assets/styles/"))
});

// pug
gulp.task('pug', () => {
  var option = {
      pretty: true
  }
  gulp.src("./src/pug/*.pug")
      .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(pug(option))
      .pipe(gulp.dest("./dev/"))
      .pipe(gulp.dest("./www/"))
});

// js-copy
gulp.task('jsCopy', () => {
  gulp.src("./src/js/*.js")
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest("./dev/assets/scripts/"))
    .pipe(gulp.dest("./www/assets/scripts/"));
});

// images
gulp.task('images', () => {
  return gulp.src('./src/images/**/*.{png,jpg,gif,svg}')
    .pipe(imagemin([
      mozjpeg({
        quality: 85,
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest('./dev/assets/images/'))
    .pipe(gulp.dest('./www/assets/images/'));
});

gulp.task('watch', () => {
  gulp.watch(['./src/pug/**/*.pug'], ['pug']);
  gulp.watch(['./src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/js/**/'], ['jsCopy']);
  gulp.watch(['./src/images/**/*.{png,jpg,gif,svg}'], ['images']);
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: "./dev/"
    }
  });
  gulp.watch("./dev/*.html", ['reload']);
  gulp.watch("./dev/assets/styles/*.css", ['reload']);
  gulp.watch("./dev/assets/scripts/*.js", ['reload']);
  gulp.watch("./dev/assets/images/", ['reload']);
});

gulp.task('reload', () => {
  browserSync.reload();
});