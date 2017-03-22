'use strict';

/* eslint quotes: 0, comma-dangle: 0 */

const assert = require('assert');
const fs = require('fs');
const MT = require('..');

describe('MT', () => {
  const md = fs.readFileSync('./test/test.md').toString();
  console.log(md);
  const ret = MT(md);

  console.log(JSON.stringify(ret, null, 2));

  const content = ret.content;

  it('support link reference', function() {
    const reference = content;
    assert.deepEqual(reference, [
      'article',
      ['h2', 'React 简介'],
      ['p', '这是一个简单的例子'],
      ['div', 'hello world'],
      [
        'pre',
        {
          lang: 'jsx'
        },
        ['code', "import React from 'react';"]
      ],
      ['p', '内联标记 ', ['code', '<div />']]
    ]);
  });
});
