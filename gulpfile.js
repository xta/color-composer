"use strict";

var gulp = require('gulp');

// gulp plugins
var jshint      = require('gulp-jshint');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var source      = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var streamify   = require('gulp-streamify');
var browserify  = require('browserify');
var livereload  = require('gulp-livereload');

// Lint JS Tasks
gulp.task('lint-app', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint-lib', function() {
    return gulp.src('assets/js/lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint', ['lint-app', 'lint-lib']);

// Concatenate, Browserify & Minify JS
gulp.task('process-js', function() {
    return browserify('./assets/js/app.js').bundle()
        .pipe(source('all.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./public/'))
        .pipe(livereload());
});

gulp.task('scripts', ['lint', 'process-js']);

// Compile SASS
gulp.task('sass', function() {
    return gulp.src('assets/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});

// Concatenate CSS
gulp.task('concat-css', function() {
    return gulp.src([
        './assets/css/vendor/reset.css',
        './assets/css/**/*.css'
        ])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('public'))
    .pipe(livereload());
});

gulp.task('styles', ['sass', 'concat-css']);

// Watch Files For Changes
gulp.task('watch', function() {
    var server = livereload();

    gulp.watch(['public/**/*', 'index.html'],
        function(event) {
            return gulp.src(event.path).pipe(livereload());
        }
    );

    gulp.watch('assets/sass/**/*', ['styles']);
    gulp.watch('assets/css/**/*', ['concat-css']);
    gulp.watch('assets/js/**/*', ['scripts']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'watch']);
