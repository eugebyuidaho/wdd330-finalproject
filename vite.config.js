import { resolve } from 'path';
import { build, defineConfig } from 'vite';

export default defineConfig({
    root: 'src/',

    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
        },
    },

});