'use strict';
const fs = require('fs-extra');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src/web');
const destDir = path.resolve(__dirname, '../dist/web');

async function copyWebDirectory() {
    try {
        const srcExists = await fs.pathExists(srcDir);
        if (!srcExists) {
            console.error(`Source directory ${srcDir} does not exist.`);
            return;
        }

        await fs.copy(srcDir, destDir);
    } catch (err) {
        console.error(`Error copying directory from ${srcDir} to ${destDir}:`, err);
    }
}

copyWebDirectory();