const md2jsonml = require('../src/md2jsonml');
const assert = require('assert');
const unpad = require('./unpad');

describe('HORIZONTAL RULES', function() {
  it('* * *', function() {
    const actual = md2jsonml(
      unpad(
        `
        * * *
        `,
      ),
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('***', function() {
    const actual = md2jsonml(
      unpad(
        `
        ***
        `,
      ),
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('*****', function() {
    const actual = md2jsonml(
      unpad(
        `
        *****
        `,
      ),
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('- - -', function() {
    const actual = md2jsonml(
      unpad(
        `
        - - -
        `,
      ),
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('--------------', function() {
    const actual = md2jsonml(
      unpad(
        `
        --------------
        `,
      ),
    );
    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });
});
