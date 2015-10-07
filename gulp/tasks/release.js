import gulp from "gulp";
import packager from "electron-packager";
import runSequence from "run-sequence";
import del from "del";
import info from "../../package.json";
import electronInfo from "../../node_modules/electron-prebuilt/package.json";
import conf from "../config";

gulp.task("clean:rel", del.bind(null, [conf.relDir]));

gulp.task("release", () => {
  return runSequence.use(gulp)(
      "clean:rel",
      "dist",
      () => {
        packager({
          dir: 'dist/',
          name: info.name,
          platform: "win32,darwin",
          arch: "ia32,x64",
          version: electronInfo.version,
          out: conf.relDir,
          cache: conf.tmpDir
        },
        (err) => {
          console.log(err);
        });
      });
});
