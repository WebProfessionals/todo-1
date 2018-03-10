const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

const browserSync = require('browser-sync').create();

gulp.task('build', ['clean', 'babel', 'sass', 'copy']);


gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
      .pipe(clean());
});

gulp.task('babel', () =>
    gulp.src(['src/js/*.js', 'src/node_modules/todooo/todo.js'], {base: 'src/'})
        .pipe(babel({
          presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);


gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./src/css'))
      .pipe(browserSync.reload({
        stream: true
      }));
});


gulp.task('copy', function () {
  gulp
      .src(['src/index.html', 'src/**/*.css', 'src/media/**/*.svg'], {base: 'src/'})
      .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});


gulp.task('sass:watch', ['browserSync'], function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});