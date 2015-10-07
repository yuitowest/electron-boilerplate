import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins"
import conf from "../config";

let $ = gulpLoadPlugins();

gulp.task("compile:jsx", () => {
  return gulp.src(`${conf.srcDir}/**/*.jsx`)
    .pipe($.sourcemaps.init())
    .pipe($.babel(conf.babelOptions))
    .pipe($.react())
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(conf.tmpDistDir));
});

gulp.task("compile:js", () => {
  return gulp.src(`${conf.srcDir}/**/*.js`)
    .pipe($.sourcemaps.init())
    .pipe($.babel(conf.babelOptions))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(conf.tmpDistDir));
});

gulp.task("compile:css", () => {
  return gulp.src(`${conf.srcDir}/**/*.css`)
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(conf.tmpDistDir));
});

gulp.task('watch:js', (done) => {
  gulp.src(`${conf.srcDir}/**/*.js`)
    .pipe($.watch(`${conf.srcDir}/**/*.js`, {verbose: true}))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel(conf.babelOptions))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(conf.tmpDistDir));
  done();
});

gulp.task('watch:jsx', (done) => {
  gulp.src(`${conf.srcDir}/**/*.jsx`)
    .pipe($.watch(`${conf.srcDir}/**/*.jsx`, {verbose: true}))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel(conf.babelOptions))
    .pipe($.react())
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(conf.tmpDistDir));
  done();
});

gulp.task("watch:css", (done) => {
  gulp.src(`${conf.srcDir}/**/*.css`)
    .pipe($.watch(`${conf.srcDir}/**/*.css`, {verbose: true}))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(conf.tmpDistDir));
  done();
});
