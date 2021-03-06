const md2jsonml = require('../src/md2jsonml');
const assert = require('assert');
const unpad = require('./unpad');

describe('table', function() {
  it('short table', function() {
    const actual = md2jsonml(
      unpad(
        `
        First Header | Second Header
        ------------ | -------------
        Content from cell 1 | Content from cell 2
        Content in the first column | Content in the second column`,
      ),
    );

    const expected = [
      'article',
      [
        'table',
        ['thead', ['tr', ['th', 'First Header'], ['th', 'Second Header']]],
        [
          'tbody',
          ['tr', ['td', 'Content from cell 1'], ['td', 'Content from cell 2']],
          [
            'tr',
            ['td', 'Content in the first column'],
            ['td', 'Content in the second column'],
          ],
        ],
      ],
    ];
    assert.deepEqual(actual, expected);
  });

  it('fulled table', function() {
    const actual = md2jsonml(
      unpad(
        `
        |First Header | Second Header|
        |------------ | -------------|
        |Content from cell 1 | Content from cell 2|
        |Content in the first column | Content in the second column|
        `,
      ),
    );

    const expected = [
      'article',
      [
        'table',
        ['thead', ['tr', ['th', 'First Header'], ['th', 'Second Header']]],
        [
          'tbody',
          ['tr', ['td', 'Content from cell 1'], ['td', 'Content from cell 2']],
          [
            'tr',
            ['td', 'Content in the first column'],
            ['td', 'Content in the second column'],
          ],
        ],
      ],
    ];
    assert.deepEqual(actual, expected);
  });
});
