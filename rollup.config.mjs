import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';
import { dts } from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';

import { defineConfig } from 'rollup';
import * as packageJson from './package.json';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ 
                tsconfig: './tsconfig.json',
                jsx: 'react'
            }),
            postcss({
                extensions: ['.css', '.scss'],
                extract: true,
                minimize: true,
                use: ['sass'],
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.ts', '.tsx'],
                presets: [
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                ]
            }),
            json()
        ],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
    }
]);