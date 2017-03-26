var TAG_REGEX = /(?:\<(\w+)([^\>]*)\>)([\t\n\s\S]*)(?:\<\/(\1)\>)/;
var CLOSE_TAG_REGEX = /(?:\<(\w+)([\n\s\S]*)\/\>)/;
var SINGGLE_TAG = /^\<(\w+)([^\>]*)\>$/;
var TAIL_TAG = /^\<\/\w+\>/;

function attributeParse(attribute) {
  attribute = attribute.trim();
  var attributeArr = attribute.split(' ');
  var attrObj = {};
  attributeArr.forEach(function(attr) {
    var attrName = attr.split('=')[0];
    var attrValue = attr.split('=')[1] || true;
    if (typeof attrValue === 'string') {
      attrValue = attrValue.replace(/^["\']/, '').replace(/["\']$/, '');
    }
    attrObj[attrName] = attrValue;
  });

  return attrObj;
}

module.exports = function html2json(htmlText) {
  htmlText = htmlText || '';
  htmlText = htmlText.trim();

  if (!htmlText) {
    return null;
  }

  if (TAG_REGEX.test(htmlText)) {
    var element = htmlText.match(TAG_REGEX);

    if (element[2].trim()) {
      return [element[1], attributeParse(element[2]), html2json(element[3])];
    } else {
      return [element[1], html2json(element[3])];
    }
  } else if (CLOSE_TAG_REGEX.test(htmlText)) {
    var element = htmlText.match(CLOSE_TAG_REGEX);
    if (element[2].trim()) {
      return [element[1], attributeParse(element[2])];
    } else {
      return [element[1]];
    }
  } else if (SINGGLE_TAG.test(htmlText)) {
    var element = htmlText.match(SINGGLE_TAG);
    if (element[2].trim()) {
      return [element[1], attributeParse(element[2])];
    } else {
      return [element[1]];
    }
  } else if (TAIL_TAG.test(htmlText)) {
    return [''];
  } else {
    return htmlText;
  }
};
