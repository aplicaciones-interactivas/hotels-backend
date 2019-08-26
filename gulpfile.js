const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', (cb) => {
    process.env.NODE_ENV = 'test';
    gulp.src(['test/**/*.js'], {read: false})
        .pipe(mocha({reporter: 'list', exit: true}))
        .on('error', console.error)
        .once('end', () => {
            process.exit();
        });
    cb();
});