const md2jsonml = require('../');
const assert = require('assert');
const unpad = require('./unpad');
const util = require('util');

describe('EMPHASIS', function() {
  it('div', function() {
    const actual = md2jsonml(
      unpad(
        `
        <div>hello world</div>
        `
      )
    );
    const expected = ['article', ['div', 'hello world']];
    assert.deepEqual(actual, expected);
  });
  it('div.class', function() {
    const actual = md2jsonml(
      unpad(
        `
        <div class="md2jsonml" disable>hello world</div>
        `
      )
    );
    const expected = [
      'article',
      [
        'div',
        {
          class: 'md2jsonml',
          disable: true
        },
        'hello world'
      ]
    ];
    assert.deepEqual(actual, expected);
  });
  it('span', function() {
    const actual = md2jsonml(
      unpad(
        `
        <span>hello world</span>
        `
      )
    );

    const expected = ['article', ['p', ['span', 'hello world']]];
    assert.deepEqual(actual, expected);
  });
  it('p', function() {
    const actual = md2jsonml(
      unpad(
        `
        <p>hello world</p>
        `
      )
    );
    const expected = ['article', ['p', 'hello world']];
    assert.deepEqual(actual, expected);
  });
  it('empth children tag', function() {
    const actual = md2jsonml(
      unpad(
        `
        <a name="hello"></a>
        `
      )
    );
    const expected = ['article', ['p', ['a', { name: 'hello' }]]];
    assert.deepEqual(actual, expected);
  });
});
