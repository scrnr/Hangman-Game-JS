import { isBuild } from '../../gulpfile.js';
import { modules } from '../imports.js';
import { paths } from '../config/paths.js';
import { jsToOneFile, isTS, webpackSettings, outputFileName } from '../config/settings.js';

/**
 * Creates the path for scripts files
 */
const path = paths.scripts.ignore
    ? [
        paths.scripts.src,
        `!${paths.scripts.ignore}`
    ]
    : paths.scripts.src;

/**
 * Creates the presets for the 'Webpack' module
 */
const presets = [
    '@babel/preset-env'
];
if (isTS) presets.unshift('@babel/preset-typescript');

/**
 * Creates the entry path for the 'Webpack' module
 */
const output = jsToOneFile ? {
    path: `/${paths.scripts.dest}`,
    filename: outputFileName
} : undefined;

/**
 * Task for TypeScript or JavaScript files
 */
export const taskScripts = () => {
    return modules.gulp.src(path)
        .pipe(modules.plumber({
            errorHandler: modules.notify.onError({
                title: 'Scripts',
                message: 'Error: <%= error.message %>'
            })
        }))
        .pipe(modules.gulpIf(
            !jsToOneFile,
            modules.named()
        ))
        .pipe(modules.webpack({
            mode: isBuild ? 'production' : 'development',
            devtool: isBuild ? undefined : 'source-map',
            output: output,
            module: {
                rules: [
                    {
                        test: webpackSettings.regex,
                        exclude: webpackSettings.exclude,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: presets
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: webpackSettings.extensions
            }
        }))
        .pipe(modules.gulpIf(
            isBuild,
            modules.uglify()
        ))
        .pipe(modules.rename((path) => {
            if (!path.extname.includes('map')) {
                path.basename = path.basename.concat('.min');
            }
        }))
        .pipe(modules.plumber.stop())
        .pipe(modules.gulp.dest(paths.scripts.dest));
};
