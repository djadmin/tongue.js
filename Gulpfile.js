var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var jsFiles = 'src/*.js', jsDest = 'dist';

gulp.task('build', function () {
	return gulp.src(jsFiles)
		.pipe(concat('tongue.js'))
		.pipe(gulp.dest(jsDest))
		.pipe(rename('tongue.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDest))
});

gulp.task('jshint', function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'))
});

gulp.task('test', function () {
	return gulp.src('test.js', {read: false})
	// gulp-mocha needs filepaths so you can't have any plugins before it
	.pipe(mocha({reporter: 'nyan'}));
});


gulp.task('default', ['jshint', 'build']);