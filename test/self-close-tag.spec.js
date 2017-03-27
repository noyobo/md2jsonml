const md2jsonml = require('../');
const assert = require('assert');
const unpad = require('./unpad');
const util = require('util');

describe('selfClosing', function() {
  it('<img />', function() {
    const actual = md2jsonml(
      unpad(
        `
        <img src="xxx" />
        `
      )
    );

    const expected = [
      'article',
      [
        'img',
        {
          src: 'xxx'
        }
      ]
    ];
    assert.deepEqual(actual, expected);
  });
  it('<link />', function() {
    const actual = md2jsonml(
      unpad(
        `
        <link href="a.css" />
        `
      )
    );

    const expected = [
      'article',
      [
        'link',
        {
          href: 'a.css'
        }
      ]
    ];
    assert.deepEqual(actual, expected);
  });

  it('<hr />', function() {
    const actual = md2jsonml(
      unpad(
        `
        <hr />
        `
      )
    );

    const expected = ['article', ['hr']];
    assert.deepEqual(actual, expected);
  });

  it('<br />', function() {
    const actual = md2jsonml(
      unpad(
        `
        <br />
        `
      )
    );

    const expected = ['article', ['br']];
    assert.deepEqual(actual, expected);
  });
});
