const md2jsonml = require('../');
const assert = require('assert');
const unpad = require('./unpad');
const util = require('util');

describe('lists', function() {
  it('numbered lists', function() {
    const actual = md2jsonml(
      unpad(
        `
        1. one
        2. two
        3. three
        `
      )
    );
    assert.deepEqual(actual, [
      'article',
      ['ol', ['li', ['p', 'one']], ['li', ['p', 'two']], ['li', ['p', 'three']]]
    ]);
  });

  it('numbered lists even', function() {
    const actual = md2jsonml(
      unpad(
        `
        4. one
        1. two
        8. three
        `
      )
    );
    assert.deepEqual(actual, [
      'article',
      ['ol', ['li', ['p', 'one']], ['li', ['p', 'two']], ['li', ['p', 'three']]]
    ]);
  });

  it('bulleted lists +', function() {
    const actual = md2jsonml(
      unpad(
        `
        + one
        + two
        + three
        `
      )
    );
    assert.deepEqual(actual, [
      'article',
      ['ul', ['li', ['p', 'one']], ['li', ['p', 'two']], ['li', ['p', 'three']]]
    ]);
  });

  it('bulleted lists -', function() {
    const actual = md2jsonml(
      unpad(
        `
        - one
        - two
        - three
        `
      )
    );
    assert.deepEqual(actual, [
      'article',
      ['ul', ['li', ['p', 'one']], ['li', ['p', 'two']], ['li', ['p', 'three']]]
    ]);
  });

  it('bulleted lists *', function() {
    const actual = md2jsonml(
      unpad(
        `
        * one
        * two
        * three
        `
      )
    );
    assert.deepEqual(actual, [
      'article',
      ['ul', ['li', ['p', 'one']], ['li', ['p', 'two']], ['li', ['p', 'three']]]
    ]);
  });

  it('bulleted lists * has spaces', function() {
    const actual = md2jsonml(
      unpad(
        `
        *   one
        *   two
        *   three
        `
      )
    );
    assert.deepEqual(actual, [
      'article',
      ['ul', ['li', ['p', 'one']], ['li', ['p', 'two']], ['li', ['p', 'three']]]
    ]);
  });
});
