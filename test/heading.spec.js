const md2jsonml = require('../src/md2jsonml');
const assert = require('assert');

describe('heading', function() {
  it('heading it work', function() {
    assert.deepEqual(md2jsonml('# hello'), ['article', ['h1', 'hello']]);
    assert.deepEqual(md2jsonml('## hello'), ['article', ['h2', 'hello']]);
    assert.deepEqual(md2jsonml('### hello'), ['article', ['h3', 'hello']]);
    assert.deepEqual(md2jsonml('#### hello'), ['article', ['h4', 'hello']]);
    assert.deepEqual(md2jsonml('##### hello'), ['article', ['h5', 'hello']]);
    assert.deepEqual(md2jsonml('###### hello'), ['article', ['h6', 'hello']]);
  });

  it('heading work underline-ish style', function() {
    assert.deepEqual(md2jsonml('hello\n======'), ['article', ['h1', 'hello']]);
    assert.deepEqual(md2jsonml('hello\n------'), ['article', ['h2', 'hello']]);
  });
});
