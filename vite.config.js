import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src/',

    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                recipe: resolve(__dirname, 'src/recipe/index.html'),
                favorites: resolve(__dirname, 'src/favorites/index.html'),
                kids: resolve(__dirname, 'src/kids/index.html'),
            },
        },
    },

});
