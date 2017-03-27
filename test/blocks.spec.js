const md2jsonml = require('../');
const assert = require('assert');
const unpad = require('./unpad');
const util = require('util');

describe('blocks', function() {
  it('code block', function() {
    const actual = md2jsonml(
      unpad(
        `
        This is a normal paragraph:

            This is a code block.
        `
      )
    );
    const expected = [
      'article',
      ['p', 'This is a normal paragraph:'],
      [
        'pre',
        {
          lang: null
        },
        ['code', 'This is a code block.']
      ]
    ];
    assert.deepEqual(actual, expected);
  });

  it('code block mutiple line', function() {
    const actual = md2jsonml(
      unpad(
        `
        Here is an example of AppleScript:

            tell application "Foo"
                beep
            end tell
        `
      )
    );

    const expected = [
      'article',
      ['p', 'Here is an example of AppleScript:'],
      [
        'pre',
        {
          lang: null
        },
        ['code', 'tell application "Foo"\n    beep\nend tell']
      ]
    ];
    assert.deepEqual(actual, expected);
  });

  it('code block 4 spces html', function() {
    const actual = md2jsonml(
      unpad(
        `
        Here is an example of Html:

            <div class="footer">
                &copy; 2004 Foo Corporation
            </div>
        `
      )
    );
    const expected = [
      'article',
      ['p', 'Here is an example of Html:'],
      [
        'pre',
        {
          lang: null
        },
        ['code', '<div class="footer">\n    &copy; 2004 Foo Corporation\n</div>']
      ]
    ];
    assert.deepEqual(actual, expected);
  });

  it('code block use ```', function() {
    const actual = md2jsonml(
      unpad(
        `
        \`\`\`
        if (isAwesome){
          return true
        }
        \`\`\`
        `
      )
    );
    const expected = [
      'article',
      [
        'pre',
        {
          lang: null
        },
        ['code', 'if (isAwesome){\n  return true\n}']
      ]
    ];
    assert.deepEqual(actual, expected);
  });

  it('code block use ```javascript', function() {
    const actual = md2jsonml(
      unpad(
        `
        \`\`\`javascript
        if (isAwesome){
          return true
        }
        \`\`\`
        `
      )
    );
    const expected = [
      'article',
      [
        'pre',
        {
          lang: 'javascript'
        },
        ['code', 'if (isAwesome){\n  return true\n}']
      ]
    ];
    assert.deepEqual(actual, expected);
  });

  it('blockquote', function() {
    const actual = md2jsonml(
      unpad(
        `
        > Coffee. The finest organic suspension ever devised... I beat the Borg with it.
        > - Captain Janeway
        `
      )
    );
    const expected = [
      'article',
      [
        'blockquote',
        ['p', 'Coffee. The finest organic suspension ever devised... I beat the Borg with it.'],
        ['ul', ['li', ['p', 'Captain Janeway']]]
      ]
    ];
    assert.deepEqual(actual, expected);
  });
});
