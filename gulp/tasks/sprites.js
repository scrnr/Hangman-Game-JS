import { modules } from '../imports.js';
import { paths } from '../config/paths.js';
import { spriteSettings } from '../config/settings.js';

/**
 * Creates the path for sprites
 */
const path = paths.sprites.ignore
    ? [
        paths.sprites.src,
        `!${paths.sprites.ignore}`
    ]
    : paths.sprites.src;

/**
 * Task for creating a sprite
 */
export const taskSprites = () => {
    const src = modules.gulp.src(path)
        .pipe(modules.plumber({
            errorHandler: modules.notify.onError({
                title: 'Sprites',
                message: 'Error: <%= error.message %>'
            })
        }));

    const { css, img } = src
        .pipe(modules.spritesmith({
            algorithm: 'top-down',
            cssName: spriteSettings.cssName,
            imgName: spriteSettings.imgName,
            imgOpts: {
                format: spriteSettings.imgFormat
            },
            imgPath: spriteSettings.imgPath,
            padding: spriteSettings.padding
        }));

    css.pipe(modules.gulp.dest(paths.sprites.dest.scss));

    return img
        .pipe(modules.buffer())
        .pipe(modules.imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: spriteSettings.optimizationLevel
        }))
        .pipe(modules.plumber.stop())
        .pipe(modules.gulp.dest(paths.sprites.dest.img));
};
