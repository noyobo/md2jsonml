const md2jsonml = require('../');
const assert = require('assert');
const unpad = require('./unpad');
const util = require('util');

describe('images', function() {
  it('pictures', function() {
    const actual = md2jsonml(
      unpad(
        `
        ![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
        `
      )
    );
    const expected = [
      'article',
      [
        'p',
        [
          'img',
          {
            title: null,
            src: 'https://octodex.github.com/images/yaktocat.png',
            alt: 'Image of Yaktocat'
          }
        ]
      ]
    ];
    assert.deepEqual(actual, expected);
  });

  it('picture link', function() {
    const actual = md2jsonml(
      unpad(
        `
        [![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)](https://github.com)
        `
      )
    );

    const expected = [
      'article',
      [
        'p',
        [
          'a',
          {
            title: null,
            href: 'https://github.com'
          },
          [
            'img',
            {
              title: null,
              src: 'https://octodex.github.com/images/yaktocat.png',
              alt: 'Image of Yaktocat'
            }
          ]
        ]
      ]
    ];
    assert.deepEqual(actual, expected);
  });
});
