import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            exports: 'named',
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'markdownTableRepair',
            exports: 'named',
        },
    ],
});
