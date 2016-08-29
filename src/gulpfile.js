var gulp   = require('gulp');
var lambda = require('gulp-awslambda');
var zip    = require('gulp-zip');

gulp.task('default', function() {
    return gulp.src('simpleService.js')
        .pipe(zip('archive.zip'), 'publish')
        .pipe(lambda('lambda_function_name', {
          publish: true,
          region: 'us-east-1'
        })).pipe(gulp.dest('.'));
});
