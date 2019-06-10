const md2jsonml = require('../src/md2jsonml');
const assert = require('assert');
const unpad = require('./unpad');

describe('EMPHASIS', function() {
  it('work', function() {
    const actual = md2jsonml(
      unpad(
        `
        *single asterisks*

        _single underscores_

        **double asterisks**

        __double underscores__

        \`inline code\`
        `,
      ),
    );

    const expected = [
      'article',
      ['p', ['em', 'single asterisks']],
      ['p', ['em', 'single underscores']],
      ['p', ['strong', 'double asterisks']],
      ['p', ['strong', 'double underscores']],
      ['p', ['code', 'inline code']],
    ];
    assert.deepEqual(actual, expected);
  });
});
