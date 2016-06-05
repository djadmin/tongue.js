var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var jsFiles = 'src/*.js', jsDest = 'dist';

gulp.task('default', function() {
	return gulp.src(jsFiles)
		.pipe(concat('tongue.js'))
		.pipe(gulp.dest(jsDest))
		.pipe(rename('tongue.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDest))
});