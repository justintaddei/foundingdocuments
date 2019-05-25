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
const replace = require("gulp-replace");
const pkg = require("./package.json");
const { readFileSync } = require("fs");

const VERSION =
  // Use arg to test updating the app without editing package.json
  process.argv.indexOf("--dev-version") !== -1
    ? process.argv[process.argv.indexOf("--dev-version") + 1]
    : pkg.version;

console.log(VERSION);

/**
 * The root of the app
 */
const pageRoot = "/foundingdocuments";
const pageRootVar = "{%ROOT%}";

const IS_PRODUCTION = process.argv.indexOf("--production") !== -1;

/**
 * Output locations for file types.
 */
let DEST = {
  CSS: "./build/css",
  JS: "./build/js",
  ES6: "./build/es6",
  JSON: "./build/json",
  HTML: "./build",
  ROOT: "./build",
  IMGS: "./build/imgs"
};

if (!IS_PRODUCTION) {
  DEST = {
    CSS: "./build/foundingdocuments/css",
    JS: "./build/foundingdocuments/js",
    ES6: "./build/foundingdocuments/es6",
    JSON: "./build/foundingdocuments/json",
    HTML: "./build/foundingdocuments",
    ROOT: "./build/foundingdocuments",
    IMGS: "./build/foundingdocuments/imgs"
  };
}

/**
 * Complies scripts with babel and copies to `./build/es6`
 */
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
    .pipe(replace(pageRootVar, pageRoot))
    .pipe(gulp.dest(DEST.JS));
}

/**
 * Complies scripts to `./build/es6`
 */
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
    .pipe(replace(pageRootVar, pageRoot))
    .pipe(gulp.dest(DEST.ES6));
}

/**
 * Copies the service worker to `./build`
 */
function sw() {
  return gulp
    .src("./src/service-worker.js")
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
    .pipe(sourcemaps.write("."))
    .pipe(replace("{%VERSION%}", VERSION))
    .pipe(replace(pageRootVar, pageRoot))
    .pipe(gulp.dest(DEST.ROOT));
}

/**
 * Compiles all .scss files to `./build/css`
 */
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

/**
 * Copies the contents of `./src/imgs` to `./build/imgs`
 */
function imgs() {
  return gulp
    .src("./src/imgs/**/*")
    .pipe(replace(pageRootVar, pageRoot))
    .pipe(gulp.dest(DEST.IMGS));
}

/**
 * Copies the contents of `./src/html` to `./build`
 */
function html() {
  return gulp
    .src(["./src/html/**/*"])
    .pipe(plumber())
    .pipe(
      // Replace "{{markup location}} with the file contents"
      replace(/{{([\w\d\-]+)}}/g, (_, $1) => {
        return readFileSync(`./src/html/${$1}_markup.html`).toString();
      })
    )
    .pipe(
      replace(/\[\[([\w\d\-]+)\]\]/g, (_, $1) => {
        return IS_PRODUCTION
          ? readFileSync(`./src/html/${$1}_prod.html`).toString()
          : "";
      })
    )
    .pipe(replace(pageRootVar, pageRoot))
    .pipe(gulp.dest(DEST.HTML));
}

/**
 * Copies the contents of `./src/polyfills` to `./build`
 */
function polyfills() {
  return gulp
    .src(["./src/polyfills/**/*"])
    .pipe(plumber())
    .pipe(gulp.dest(DEST.ROOT));
}

/**
 * Sets BrowserSync to proxy `localhost` and watches files.
 */
function watch() {
  browserSync.init({
    proxy: "localhost",
    open: false
  });

  gulp.watch(["./src/scss/**/*.scss"], scss);
  gulp
    .watch(["./src/js/**/*.js"], gulp.parallel(js, es6))
    .on("change", browserSync.reload);
  gulp.watch(["./src/service-worker.js"], sw).on("change", browserSync.reload);
  gulp.watch(["./src/html/**/*.html"], html).on("change", browserSync.reload);
  gulp.watch(["./src/imgs/**/*.*"], imgs).on("change", browserSync.reload);
}

/**
 * Deletes the contents of `./build`
 */
function clean() {
  const del = require("del");
  return del(["build/*", "!build"], { force: true });
}

exports.html = html;

exports.clean = clean;
exports.build = gulp.parallel(js, es6, sw, scss, imgs, html, polyfills);
exports.refresh = gulp.series(clean, exports.build);
exports.watch = gulp.series(exports.refresh, watch);
