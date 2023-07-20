/**
 * Use TypeScript or JavaScript
 */
export const isTS = true;

/**
 * If you need to concat all files in just one, then set the value to 'true'
 */
export const jsToOneFile = true;

/**
 * If 'jsToOneFile' is 'true', you'll need to enter the file name with the file extname
 */
export const outputFileName = 'game.js';

/**
 * Settings for the 'Webpack' module
 */
export const webpackSettings = {
    regex: /\.ts$/,
    exclude: /node_modules/,
    extensions: ['.ts']
};

/**
 * Sprite's name in output
 */
const spriteName = 'sprite';

/**
 * Sprite's format in output
 */
const spriteFormat = 'png';

/**
 * Full sprite's name
 */
const sprite = `${spriteName}.${spriteFormat}`;

/**
 * Settings for the 'gulp.spritesmith' module
 */
export const spriteSettings = {
    optimizationLevel: 5,
    imgName: sprite,
    imgPath: `../img/${sprite}`,
    imgFormat: spriteFormat,
    cssName: `_${spriteName}.scss`,
    padding: 10
};

/**
 * Level of image optimization for the 'gulp-imagemin' module
 */
export const imageOptimizationLevel = 5;
