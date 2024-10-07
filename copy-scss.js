'use strict';
const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

const srcDir = path.resolve(__dirname, 'src');
const destDir = path.resolve(__dirname, 'dist/esm/types');

function copySCSSFiles() {
    try {
        const files = glob.sync(`${srcDir}/**/*.scss`);

        if (!Array.isArray(files) || files.length === 0) {
            console.log('No SCSS files found.');
            return;
        }

        files.forEach((file) => {
            const relativePath = path.relative(srcDir, file);
            const destPath = path.join(destDir, relativePath);

            fs.ensureDir(path.dirname(destPath));

            fs.copy(file, destPath)
                .catch((copyErr) => {
                    console.error(`Error copying file ${file}:`, copyErr);
                });
        });
    } catch (err) {
        console.error('Error finding SCSS files:', err);
    }
}

copySCSSFiles();