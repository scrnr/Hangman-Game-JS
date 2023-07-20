import { modules } from '../imports.js';
import { paths } from '../config/paths.js';

export const taskCleanDir = () => {
    return modules.gulp.src([
        paths.styles.dest,
        paths.scripts.dest,
        // paths.images.dest,
        // paths.sprites.dest.scss,
        // paths.sprites.dest.img
    ])
        .pipe(modules.plumber({
            errorHandler: modules.notify.onError({
                title: 'Clean Styles Dir',
                message: 'Error: <%= error.message %>'
            })
        }))
        .pipe(modules.cleanDir())
        .pipe(modules.plumber.stop())
};
