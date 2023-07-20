import { modules } from '../imports.js';
import { paths } from '../config/paths.js';
import { imageOptimizationLevel } from '../config/settings.js';

/**
 * Creates the path for images
 */
const path = paths.images.ignore
    ? [
        paths.images.src,
        `!${paths.images.ignore}`
    ]
    : paths.images.src;

/**
 * Task for images
 */
export const taskImageMin = () => {
    return modules.gulp.src(path)
        .pipe(modules.plumber({
            errorHandler: modules.notify.onError({
                title: 'ImageMin',
                message: 'Error: <%= error.message %>'
            })
        }))
        .pipe(modules.imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: imageOptimizationLevel
        }))
        .pipe(modules.plumber.stop())
        .pipe(modules.gulp.dest(paths.images.dest));
};
