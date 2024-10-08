import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
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
                assetFileNames: '[name][extname]'
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
                assetFileNames: '[name][extname]'
            },
        ],
        external: [
            'react',
            'react-dom'
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ 
                tsconfig: './tsconfig.json',
                jsx: 'react'
            }),
            scss({
                fileName: 'index.css',
                sass: require('sass'),
                outputStyle: 'compressed'
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.ts', '.tsx'],
                presets: [
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                ]
            }),
            json(),
            terser()
        ]
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{
            file: 'dist/index.d.ts',
            format: 'esm'
        }],
        plugins: [
            scss({
                fileName: 'index.css',
                sass: require('sass'),
                outputStyle: 'compressed'
            }),
            dts({
                exclude: [/\.scss$/]
            })
        ],
    }
]);