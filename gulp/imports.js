import buffer from 'vinyl-buffer';
import cleanDir from 'gulp-clean';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpPlumber from 'gulp-plumber';
import gulpNotify from 'gulp-notify';
import rename from 'gulp-rename';
import replace from 'gulp-replace';

import autoPrefixer from 'gulp-autoprefixer';
import dartSass from 'sass';
import gulpMedia from 'gulp-group-css-media-queries';
import gulpSass from 'gulp-sass';
import gulpCleanCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import spritesmith from 'gulp.spritesmith';

import named from 'vinyl-named';
import uglifyEs from 'gulp-uglify-es';
import webpackStream from 'webpack-stream';

const sass = gulpSass(dartSass);
const uglify = uglifyEs.default;

/**
 * All gulp modules
 */
export const modules = {
    autoprefixer: autoPrefixer,
    buffer: buffer,
    cleanCss: gulpCleanCss,
    cleanDir: cleanDir,
    gulp: gulp,
    gulpIf: gulpIf,
    imagemin: imagemin,
    media: gulpMedia,
    named: named,
    notify: gulpNotify,
    plumber: gulpPlumber,
    rename: rename,
    replace: replace,
    sass: sass,
    spritesmith: spritesmith,
    uglify: uglify,
    webpack: webpackStream
};
