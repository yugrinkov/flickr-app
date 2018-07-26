var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulp = require('gulp');

//script paths
var jsFiles = [
  './assets/js/utils.js',
  './assets/js/core.js',
  './assets/js/navigation.js',
  './assets/js/main.js'
  ],
  jsDest = 'dist/';

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});
