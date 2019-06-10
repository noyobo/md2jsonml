const md2jsonml = require('../src/md2jsonml');
const assert = require('assert');
const unpad = require('./unpad');

describe('links', function() {
  it('common link', function() {
    const actual = md2jsonml(
      unpad(
        `
        [github.com](https://github.com)
        `,
      ),
    );
    const expected = [
      'article',
      [
        'p',
        [
          'a',
          {
            href: 'https://github.com',
            title: null,
          },
          'github.com',
        ],
      ],
    ];
    assert.deepEqual(actual, expected);
  });

  it('like link', function() {
    const actual = md2jsonml(
      unpad(
        `
        [github.com]
        `,
      ),
    );
    const expected = ['article', ['p', '[github.com]']];
    assert.deepEqual(actual, expected);
  });

  it('like reference', function() {
    const actual = md2jsonml(
      unpad(
        `
        [foo][1]

        [bar][1]

        [1]

        [1]: http://example.com "Example Domain"
        `,
      ),
    );
    const expected = [
      'article',
      [
        'p',
        [
          'a',
          {
            href: 'http://example.com',
          },
          'foo',
        ],
      ],
      [
        'p',
        [
          'a',
          {
            href: 'http://example.com',
          },
          'bar',
        ],
      ],
      [
        'p',
        [
          'a',
          {
            href: 'http://example.com',
          },
          '1',
        ],
      ],
    ];
    assert.deepEqual(actual, expected);
  });
});
