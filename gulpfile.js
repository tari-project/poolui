const gulp = require('gulp');
const connect = require('gulp-connect');
const manifest = require('gulp-manifest');
const replace = require('gulp-replace');

gulp.task('html', function(){
  return gulp.src(['app/**/*.html', '!app/vendor/**/*'])
    .pipe(connect.reload())
    .pipe(gulp.dest('build/'))
});

gulp.task('css', function(){
  return gulp.src(['app/**/*.css', '!app/vendor/**/*'])
    .pipe(connect.reload())
    .pipe(gulp.dest('build/'))
});

gulp.task('js', function(){
  return gulp.src(['app/**/*.js', '!app/vendor/**/*'])
    .pipe(replace('$API_URL', process.env.API_URL || '/api'))
    .pipe(replace('$POOL_NAME', process.env.POOL_NAME || 'acmepool.com'))
    .pipe(connect.reload())
    .pipe(gulp.dest('build/'))
});

gulp.task('assets', function(){
  return gulp.src('app/assets/*')
    .pipe(connect.reload())
    .pipe(gulp.dest('build/assets'))
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('vendor', function() {
  return gulp.src([
    'app/vendor/**/dist/jquery.js',
    'app/vendor/**/angular.js',
    'app/vendor/**/angular-route.js',
    'app/vendor/**/angular-material.css',
    'app/vendor/**/angular-animate.js',
    'app/vendor/**/angular-aria.js',
    'app/vendor/**/angular-material.js',
    'app/vendor/**/angular-moment.js',
    'app/vendor/**/ngStorage.js',
    'app/vendor/**/app/angular.audio.js',
    'app/vendor/**/moment.js',
    'app/vendor/**/md-data-table.js',
    'app/vendor/**/md-data-table.css',
    'app/vendor/**/dist/chart.js',
    'app/vendor/**/dist/angular-chart.js',
    'node_modules/**/d3.js',
    'node_modules/**/LineChart.js',
    'node_modules/**/LineChart.css',
    'node_modules/**/randomColor.js',
    'app/vendor/**/lodash.js',
    'app/vendor/**/page_visibility.js'
    ])
    .pipe(gulp.dest('build/vendor'))
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html', 'manifest']);
  gulp.watch(['./app/**/*.css'], ['css', 'manifest']);
  gulp.watch(['./app/**/*.js'], ['js', 'manifest']);
  gulp.watch(['./assets/*.*'], ['assets', 'manifest']);
});

gulp.task('manifest', function(done){
  // gulp.src([
  //   'build/**/*'
  //   ], { base: './build' })
  //   .pipe(manifest({
  //     hash: true,
  //     preferOnline: true,
  //     network: ['*'],
  //     filename: 'app.manifest',
  //     exclude: 'app.manifest'
  //    }))
  //   .pipe(connect.reload())
  //   .pipe(gulp.dest('build'));
  done();
});

gulp.task('build', gulp.series([ 'html', 'css', 'js', 'assets', 'vendor', 'manifest' ]));
gulp.task('default', gulp.series([ 'build', 'connect', 'watch' ]));
