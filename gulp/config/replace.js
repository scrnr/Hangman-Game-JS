/**
 * Replaces the alias (regex) for the folder path (replacement) with images or icons
 * If you don't need it, then set the value to 'false'
 * 
 * Example:
 * 
 * img: {
 *     regex: /@img\//,
 *     replacement: 'your-path'
 * }
 * 
 */
export const replace = {
    styles: {
        img: false,
        icons: false
    },
    scripts: {
        img: {
            regex: /@resource/,
            replacement: '/src/resource'
        },
        icons: false
    }
};
