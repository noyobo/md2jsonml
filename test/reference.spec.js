const md2jsonml = require('../src/md2jsonml');
const assert = require('assert');
const unpad = require('./unpad');

describe('link references', function() {
  it('work', function() {
    const actual = md2jsonml(
      unpad(
        `
        [![build status][ci-image]][ci-url]

        [ci-image]: http://npmjs.org/task/378711/status.svg
        [ci-url]: http://npmjs.org/task/378711

        * Something
        * [Something](www.something.com)
        * ![Somethong](www.comething.com/img)
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
            href: 'http://npmjs.org/task/378711',
          },
          [
            'img',
            {
              src: 'http://npmjs.org/task/378711/status.svg',
              title: 'build status',
              alt: 'build status',
            },
          ],
        ],
      ],
      [
        'ul',
        ['li', ['p', 'Something']],
        [
          'li',
          [
            'p',
            [
              'a',
              {
                title: null,
                href: 'www.something.com',
              },
              'Something',
            ],
          ],
        ],
        [
          'li',
          [
            'p',
            [
              'img',
              {
                title: null,
                src: 'www.comething.com/img',
                alt: 'Somethong',
              },
            ],
          ],
        ],
      ],
    ];
    assert.deepEqual(actual, expected);
  });
});
