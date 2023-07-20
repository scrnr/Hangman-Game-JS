import { paths } from '../config/paths.js';
import { modules } from '../imports.js';
import { isBuild } from '../../gulpfile.js';
import { replace } from '../config/replace.js';

/**
 * Creates the path for styles files
 */
const path = paths.styles.ignore
    ? [
        paths.styles.src,
        `!${paths.styles.ignore}`
    ]
    : paths.styles.src;

/**
 * Task for SCSS files
 */
export const taskStyles = () => {
    const sourcemapSrc = isBuild ? {} : { sourcemaps: true };
    const sourcemapDest = isBuild ? {} : { sourcemaps: '.' };

    return modules.gulp.src(path, sourcemapSrc)
        .pipe(modules.plumber({
            errorHandler: modules.notify.onError({
                title: 'Styles',
                message: 'Error: <%= error.message %>'
            })
        }))
        .pipe(modules.sass())
        .pipe(modules.gulpIf(
            replace.styles.icons,
            modules.replace(
                replace.styles.icons.regex,
                replace.styles.icons.replacement
            )
        ))
        .pipe(modules.gulpIf(
            replace.styles.img,
            modules.replace(
                replace.styles.img.regex,
                replace.styles.img.replacement
            )
        ))
        .pipe(modules.gulpIf(
            isBuild,
            modules.media()
        ))
        .pipe(modules.gulpIf(
            isBuild,
            modules.autoprefixer()
        ))
        .pipe(modules.gulpIf(
            isBuild,
            modules.cleanCss({
                level: 2
            })
        ))
        .pipe(modules.rename({
            suffix: '.min'
        }))
        .pipe(modules.plumber.stop())
        .pipe(modules.gulp.dest(paths.styles.dest, sourcemapDest));
};
