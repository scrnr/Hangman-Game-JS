import { modules } from './gulp/imports.js';
import { taskCleanDir } from './gulp/tasks/cleanDir.js';
import { taskImageMin } from './gulp/tasks/imagemin.js';
import { taskScripts } from './gulp/tasks/scripts.js';
import { taskSprites } from './gulp/tasks/sprites.js';
import { taskStyles } from './gulp/tasks/styles.js';
import { taskWatch } from './gulp/tasks/watch.js';

export const isBuild = process.argv.includes('--build');

export const cleanDir = taskCleanDir;
export const imagemin = taskImageMin;
export const scripts = taskScripts;
export const sprites = taskSprites;
export const styles = taskStyles;
export const watch = taskWatch;

export const build = modules.gulp.series(
    cleanDir,
    // sprites,
    modules.gulp.parallel(
        scripts,
        styles,
        // imagemin
    )
);

export default modules.gulp.series(
    build,
    watch
);
