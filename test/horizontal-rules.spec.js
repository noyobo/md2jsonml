const md2jsonml = require('../');
const assert = require('assert');
const unpad = require('./unpad');
const util = require('util');

describe('HORIZONTAL RULES', function() {
  it('* * *', function() {
    const actual = md2jsonml(
      unpad(
        `
        * * *
      `
      )
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('***', function() {
    const actual = md2jsonml(
      unpad(
        `
        ***
      `
      )
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('*****', function() {
    const actual = md2jsonml(
      unpad(
        `
        *****
      `
      )
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('- - -', function() {
    const actual = md2jsonml(
      unpad(
        `
        - - -
      `
      )
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('--------------', function() {
    const actual = md2jsonml(
      unpad(
        `
        --------------
      `
      )
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });
});
