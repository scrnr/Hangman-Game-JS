/**
 * The settings of the paths, includes 'src', 'dest', 'watch' and 'ignore' path
 */
export const paths = {
    styles: {
        src: '/src/scss/*.*',
        dest: '/assets/css/',
        watch: '/src/scss/**/*.*',
        ignore: ''
    },
    scripts: {
        src: '/src/ts/*.*',
        dest: '/assets/js/',
        watch: '/src/ts/**/*.*',
        ignore: ''
    },
    sprites: {
        src: '',
        dest: {
            img: '',
            scss: '',
        },
        ignore: ''
    },
    images: {
        src: '',
        dest: '',
        ignore: ''
    }
};
