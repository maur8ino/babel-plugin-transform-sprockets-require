import test from 'ava';
import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import plugin from '../src';

function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

const defaultTestCases = ['absolute-path', 'relative-path'];
const fixturesDir = path.join(__dirname, 'fixtures');

const testHelper = (testCaseName, pluginOptions = {}) => {
  return test(`compare fixtures with ${testCaseName.split('-').join(' ')}`, t => {
    const fixtureDir = path.join(fixturesDir, testCaseName);
    let actualPath = path.join(fixtureDir, 'actual.js');
    const actual = transformFileSync(actualPath, {
      plugins: [[plugin, pluginOptions]],
      babelrc: false
    }).code;

    if (path.sep === '\\') {
      // Specific case of windows, transformFileSync return code with '/'
      actualPath = actualPath.replace(/\\/g, '/');
    }

    const expected = fs.readFileSync(
      path.join(fixtureDir, 'expected.js')
    ).toString().replace(/%FIXTURE_PATH%/g, actualPath);

    t.is(trim(actual), trim(expected));
  });
};

defaultTestCases.map(testCaseName => testHelper(testCaseName));
