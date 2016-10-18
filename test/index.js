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
const withBlacklistTestCases = ['absolute-path-with-blacklist'];
const withRegExpBlacklistTestCases = ['absolute-path-with-regexp-blacklist'];
const fixturesDir = path.join(__dirname, 'fixtures');

const testHelper = (testCaseName, pluginOptions = {}) => {
  test(`compare fixtures with ${testCaseName.split('-').join(' ')}`, t => {
    const fixtureDir = path.join(fixturesDir, testCaseName);
    let actualPath = path.join(fixtureDir, 'actual.js');
    const actual = trim(transformFileSync(actualPath, {
      plugins: [[plugin, pluginOptions]],
      babelrc: false
    }).code);

    if (path.sep === '\\') {
      // Specific case of windows, transformFileSync return code with '/'
      actualPath = actualPath.replace(/\\/g, '/');
    }

    const expected = trim(fs.readFileSync(
      path.join(fixtureDir, 'expected.js')
    ).toString().replace(/%FIXTURE_PATH%/g, actualPath));

    t.is(actual, expected);
  });
};

// Testing various cases
defaultTestCases.map(testCaseName => testHelper(testCaseName));
withBlacklistTestCases.map(testCaseName => testHelper(testCaseName, {
  blacklist: [ 'jquery', 'underscore', 'handlebars.runtime' ]
}));
withRegExpBlacklistTestCases.map(testCaseName => testHelper(testCaseName, {
  blacklist: [ /redux/, /handlebars/ ]
}));
