const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const runSequence = require('gulp-run-sequence');


gulp.task('build', (cb)=>{
    runSequence('clean', ['babel', 'sass'], 'copy',cb);
});


gulp.task('clean', () => {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('babel', () => {
        gulp.src(['src/js/*.js', 'src/node_modules/todooo/todo.js'], {base: 'src/'})
            .pipe(babel({presets: ['env']}))
            .pipe(gulp.dest('dist'))
    }
);


gulp.task('sass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('copy', () => {
    gulp
        .src(['src/index.html', 'src/**/*.css', 'src/media/**/*.svg'], {base: 'src/'})
        .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
});


gulp.task('sync:watch', ['browserSync'], () => {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('sass:watch', () => {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});
