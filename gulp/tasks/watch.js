import { scripts, sprites, styles } from '../../gulpfile.js';
import { modules } from '../imports.js';
import { paths } from '../config/paths.js';

export const taskWatch = () => {
    modules.gulp.watch(paths.scripts.watch, scripts);
    modules.gulp.watch(paths.styles.watch, styles);
    // modules.gulp.watch(paths.sprites.src, sprites);
};
