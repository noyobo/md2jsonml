var TAG_REGEXR = /(?:\<(\w+)([^\>]*)\>)([\t\n\s\S]*)(?:\<\/(\1)\>)/;
var CLOSE_TAG_REGEXR = /(?:\<(\w+)([\n\s\S]*)\/\>)/;

function attributeParse(attribute) {
  attribute = attribute.trim();
  var attributeArr = attribute.split(' ');
  var attrObj = {};
  attributeArr.forEach(function(attr) {
    var attrName = attr.split('=')[0];
    var attrValue = attr.split('=')[1] || '';
    attrValue = attrValue.replace(/^["\']/, '');
    attrValue = attrValue.replace(/["\']$/, '');
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

  if (TAG_REGEXR.test(htmlText)) {
    var element = htmlText.match(TAG_REGEXR);

    if (element[2].trim()) {
      return [element[1], attributeParse(element[2]), html2json(element[3])];
    } else {
      return [element[1], html2json(element[3])];
    }
  } else if (CLOSE_TAG_REGEXR.test(htmlText)) {
    var element = htmlText.match(CLOSE_TAG_REGEXR);
    if (element[2].trim()) {
      return [element[1], attributeParse(element[2])];
    } else {
      return [element[1]];
    }
  } else {
    return htmlText;
  }
};
