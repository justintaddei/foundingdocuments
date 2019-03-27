const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const rollup = require("gulp-better-rollup");
const babel = require("gulp-babel");
const node = require("rollup-plugin-node-resolve");
const cjs = require("rollup-plugin-commonjs");
const sass = require("gulp-sass");
const minify = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const cssInlineImages = require("gulp-css-inline-images");
const browserSync = require("browser-sync").create();

const DEST = {
  CSS: "./build/css",
  JS: "./build/js",
  ES6: "./build/es6",
  JSON: "./build/json",
  HTML: "./build",
  STATIC: "./build",
  IMGS: "./build/imgs"
};

function js() {
  return gulp
    .src(["./src/js/index.js", "./src/js/utils/polyfills.js"])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {
          plugins: [node(), cjs()]
        },
        "iife"
      )
    )
    .pipe(babel())
    .pipe(uglify())
    .pipe(
      sourcemaps.write("./maps", {
        sourceMappingURLPrefix: "/js"
      })
    )
    .pipe(gulp.dest(DEST.JS));
}

function es6() {
  return gulp
    .src("./src/js/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {
          plugins: [node(), cjs()]
        },
        "iife"
      )
    )
    .pipe(
      sourcemaps.write("./maps", {
        sourceMappingURLPrefix: "/es6"
      })
    )
    .pipe(gulp.dest(DEST.ES6));
}

function scss() {
  const wait = require("gulp-wait");
  return gulp
    .src(["./src/scss/index.scss"])
    .pipe(plumber())
    .pipe(wait(200))
    .pipe(sourcemaps.init())
    .pipe(sass({ compress: true }))
    .pipe(
      cssInlineImages({
        webRoot: "C:/dev/web/src"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(minify())
    .pipe(
      sourcemaps.write("./maps", {
        sourceMappingURLPrefix: "/css"
      })
    )
    .pipe(gulp.dest(DEST.CSS))
    .pipe(browserSync.stream());
}

function imgs() {
  return gulp.src("./src/imgs/**/*.*").pipe(gulp.dest(DEST.IMGS));
}

function json() {
  return gulp.src("./src/json/**/*.json").pipe(gulp.dest(DEST.JSON));
}

function html() {
  return gulp
    .src(["./src/html/**/*.*"])
    .pipe(plumber())
    .pipe(gulp.dest(DEST.HTML));
}

function polyfills() {
  return gulp
    .src(["./src/polyfills/**/*"])
    .pipe(plumber())
    .pipe(gulp.dest(DEST.STATIC));
}

function watch() {
  browserSync.init({
    server: "build",
    open: false
  });

  gulp.watch(["./src/scss/**/*.scss"], scss);
  gulp
    .watch(["./src/js/**/*.js"], gulp.parallel(js, es6))
    .on("change", browserSync.reload);
  gulp.watch(["./src/html/**/*.html"], html).on("change", browserSync.reload);
  gulp.watch(["./src/json/**/*.json"], json).on("change", browserSync.reload);
  gulp.watch(["./src/imgs/**/*.*"], imgs).on("change", browserSync.reload);
}

function clean() {
  const del = require("del");
  return del(["build/*", "!build"], { force: true });
}

exports.clean = clean;
exports.build = gulp.parallel(js, es6, scss, imgs, html, json, polyfills);
exports.refresh = gulp.series(clean, exports.build);
exports.watch = gulp.series(exports.refresh, watch);
