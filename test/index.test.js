'use strict';

/* eslint quotes: 0, comma-dangle: 0 */

const assert = require('assert');
const fs = require('fs');
const MT = require('..');

describe('MT', () => {
  const md = fs.readFileSync('./test/test.md').toString();
  const ret = MT(md);
  // console.log(JSON.stringify(ret, null, 2));

  const content = ret.content;

  it('support link reference', function() {
    const reference = content[8];
    assert.deepEqual(reference, [
      'p',
      [
        'a',
        {
          href: 'http://npmjs.org/task/378711'
        },
        [
          'img',
          {
            src: 'http://npmjs.org/task/378711/status.svg',
            title: 'build status',
            alt: 'build status'
          }
        ]
      ]
    ]);
  });
});
