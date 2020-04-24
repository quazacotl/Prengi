const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: '../dist'
        }
    });
});

gulp.task('sass', function() {
    return gulp.src("sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("../dist/css"))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("sass/**/*.+(scss|sass|css)", gulp.parallel('sass'));
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("js/*").on("change", browserSync.reload);
    gulp.watch("*.html").on("change", gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../dist/'));
});

gulp.task('scripts', function () {
    return gulp.src('js/**/*.js')
        .pipe(gulp.dest('../dist/js'));
});

gulp.task('fonts', function () {
    return gulp.src('fonts/**/*')
        .pipe(gulp.dest('../dist/fonts'));
});

gulp.task('icons', function () {
    return gulp.src('icon/*')
        .pipe(gulp.dest('../dist/icon'));
});

gulp.task('images', function () {
    return gulp.src('img/**/*')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 6})
        ]))
        .pipe(gulp.dest('../dist/img'));
});

gulp.task('default', gulp.parallel('server', 'watch', 'sass', 'html', 'scripts', 'fonts', 'icons', 'images'));