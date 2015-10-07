import _ from "lodash";
import browserify from "browserify";
import buffer from "vinyl-buffer";
import conf from "../config";
import del from "del";
import fs from "fs";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import packageJson from "../../package.json";
import runSequence from "run-sequence";
import source from "vinyl-source-stream";

let $ = gulpLoadPlugins();

gulp.task("compile:html", function () {
  var assets = $.useref.assets();
  return gulp.src(`${conf.srcDir}/index.html`)
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(conf.distDir));
  ;
});

gulp.task("clean:dist",
    del.bind(null, [conf.distDir]));

gulp.task("copy:tmpDist", () => {
  let targets = [
    `${conf.tmpDistDir}/main.js`,
    `${conf.tmpDistDir}/assets/**/*`,
    `${conf.tmpDistDir}/runtime/**/*.js`,
  ]
  return gulp.src(targets, {base: conf.tmpDistDir})
    .pipe(gulp.dest(conf.distDir));
});

gulp.task("packageJson", (done) => {
  let json = _.cloneDeep(packageJson);
  json.main = "main.js";
  fs.writeFile(conf.distDir + "/package.json", JSON.stringify(json), (err) => {
    done();
  });
});

gulp.task("browserify", () => {
  return browserify({
    entries: `${conf.tmpDistDir}/app.js`,
    debug: false,
  })
  .bundle()
  .pipe(source("app.js"))
  .pipe(buffer())
  .pipe($.uglify())
  .pipe(gulp.dest(conf.distDir));
});

gulp.task("uglify", () => {
  return gulp.src([
    `${conf.distDir}/main.js`,
    `${conf.distDir}/runtime/**/*.js`],
    {base: conf.distDir})
    .pipe($.uglify())
    .pipe(gulp.dest(conf.distDir));
});

gulp.task("minify", () => {
  return gulp.src(`${conf.srcDir}/styles/*.css`)
      // TODO: style.min.css に名前変えたい
      .pipe($.concat("app.css"))
      .pipe($.minifyCss())
      .pipe(gulp.dest(`${conf.distDir}/styles/`));
});

gulp.task("dist", callback => {
  return runSequence.use(gulp)(
      ["compile:js", "compile:jsx", "compile:css"],
      "clean:dist",
      "copy:tmpDist",
      "packageJson",
      ["compile:html", "browserify", "uglify", "minify"],
      callback
      );
});
