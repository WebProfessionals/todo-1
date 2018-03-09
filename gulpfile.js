const gulp = require('gulp');


gulp.task('hello', () => {
  console.log('Hello World');
});

var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./src/css'));
});

