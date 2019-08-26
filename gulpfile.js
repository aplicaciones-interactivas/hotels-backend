const gulp = require('gulp');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');

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

gulp.task('dev', (cb) => {
    process.env.NODE_ENV = 'development';
    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
        , done: cb
    });
});