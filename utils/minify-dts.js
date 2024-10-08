'use strict';
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../dist/index.d.ts');

const content = fs.readFileSync(file, 'utf-8');

const minified = content
  .replace(/\/\*\*[\s\S]*?\*\//g, '')
  .replace(/\/\/.*$/gm, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*;\s*/g, ';')
  .trim();

fs.writeFileSync(file, minified);