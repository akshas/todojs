var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.+(sass|scss)')
  .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}));
});
gulp.task('browserSync', function(){
  	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});
gulp.task('watch', ['sass', 'browserSync'], function() {
	gulp.watch('app/sass/**/*.+(sass|scss)', ['sass']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/**/*.html', browserSync.reload);
});
gulp.task('default', ['watch']);
