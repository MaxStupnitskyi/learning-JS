var gulp       = require('gulp'),
sass           = require('gulp-sass'),
browserSync    = require('browser-sync'),
autoprefixer   = require('gulp-autoprefixer'),
notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false,
	});
});

gulp.task('html', function () {
	gulp.src('**/*.html')
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src([
		'sass/**/*.sass',
		])
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src('js/common.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['html', 'sass', 'js', 'browser-sync'], function() {
	gulp.watch('sass/**/*.sass', ['sass']);
	gulp.watch(['js/common.js'], ['js']);
	gulp.watch('**/*.html', ['html']);
	
});

gulp.task('default', ['watch']);