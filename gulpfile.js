const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('build',['babel','sass','copy','assets']);


gulp.task('babel', () =>
    gulp.src(['src/js/*.js','src/node_modules/todooo/todo.js'], {base:'src/'})
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
      .pipe(gulp.dest('./src/css'));
});


gulp.task('copy', function () {
  gulp
      .src(['src/index.html', 'src/**/*.css'])
      .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
  gulp
      .src(['src/media/**/*.svg'])
      .pipe(gulp.dest('dist/media'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});