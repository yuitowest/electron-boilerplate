import childprocess from 'child_process';
import conf from "../config";
import del from "del";
import electronConnect from 'electron-connect';
import gulp from "gulp";
import runSequence from "run-sequence";

gulp.task("clean:tmpDist",
    del.bind(null, [conf.tmpDistDir]));

gulp.task("copy:html", () => {
  return gulp.src([`${conf.srcDir}/index.html`])
    .pipe(gulp.dest(conf.tmpDistDir));
});

gulp.task("copy:packageJson", () => {
  return gulp.src(["package.json"])
    .pipe(gulp.dest(conf.tmpDistDir));
});

gulp.task("copy:bootstrap", () => {
  const path = './node_modules/bootstrap/dist/css/'
  return gulp.src([
      path + "bootstrap-theme.css.map",
      path + "bootstrap-theme.min.css",
      path + "bootstrap.css.map",
      path + "bootstrap.min.css"
  ]).pipe(gulp.dest(`${conf.tmpDistDir}/assets`));
});

gulp.task('server', ["watch:js", "watch:jsx", "watch:css"], () => {
  let electronServer = electronConnect.server.create();
  electronServer.start();
  gulp.watch([
    `${conf.tmpDistDir}/**/*.js`,
    `${conf.tmpDistDir}/**/*.css`
  ], electronServer.reload);
});

gulp.task("build", callback => {
  return runSequence.use(gulp)(
      "clean:tmpDist",
      "copy:packageJson",
      "copy:html",
      ["compile:jsx", "compile:js", "compile:css"],
      callback
      );
});

gulp.task("init", callback => {
  return runSequence.use(gulp)(
      "build",
      "copy:bootstrap",
      callback
      );
});
