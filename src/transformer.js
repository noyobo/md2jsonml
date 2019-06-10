var html2jsonml = require('./html2jsoml');

var isTHead = false;
var definitionMap = {};

function transformTHead(node) {
  var transformedNode = transformer(node);
  isTHead = false;
  return transformedNode;
}

var selfClosing = ['!', 'img', 'link', 'hr', 'br', 'video'];

function isClosing(htmlValue) {
  var tag = htmlValue.match(/^<(!|[a-zA-Z]+).*?\/?>/);
  tag = tag && tag[1];
  if (tag && selfClosing.indexOf(tag) === -1) {
    var closeTag = new RegExp(`</${tag}>$`);
    var close = closeTag.test(htmlValue);
    return close;
  }
  return true;
}

function transformer(node, index) {
  if (node == null) return;

  if (Array.isArray(node)) {
    return node.map(transformer, index);
  }

  var transformedChildren =
    node.type === 'table'
      ? transformer(node.children.slice(1))
      : transformer(node.children);

  switch (node.type) {
    case 'root':
      return ['article'].concat(transformedChildren);
    case 'heading':
      return [`h${node.depth}`].concat(transformedChildren);
    case 'text':
      return node.value;
    case 'list':
      return [node.ordered ? 'ol' : 'ul'].concat(transformedChildren);
    case 'listItem':
      return ['li'].concat(transformedChildren);
    case 'paragraph':
      return ['p'].concat(transformedChildren);
    case 'link':
      return [
        'a',
        {
          title: node.title,
          href: node.url,
        },
      ].concat(transformedChildren);
    case 'image':
      return [
        'img',
        {
          title: node.title,
          src: node.url,
          alt: node.alt,
        },
      ];
    case 'table':
      isTHead = true;
      return [
        'table',
        ['thead', transformTHead(node.children[0])],
        ['tbody'].concat(transformedChildren),
      ];
    case 'tableRow':
      return ['tr'].concat(transformedChildren);
    case 'tableCell':
      return [isTHead ? 'th' : 'td'].concat(transformedChildren);
    case 'emphasis':
      return ['em'].concat(transformedChildren);
    case 'strong':
      return ['strong'].concat(transformedChildren);
    case 'inlineCode':
      return ['code', node.value];
    case 'code':
      return ['pre', { lang: node.lang }, ['code', node.value]];
    case 'blockquote':
      return ['blockquote'].concat(transformedChildren);
    case 'break':
      return ['br'];
    case 'thematicBreak':
      return ['hr'];
    case 'html':
      var tagClosed = isClosing(node.value);
      var htmlMT = html2jsonml(node.value);
      if (!tagClosed) {
        htmlMT.push('__tag_content_placeholder__');
      }
      return htmlMT;
    case 'linkReference':
      return [
        'a',
        {
          href: `reference#${node.identifier}`,
        },
      ].concat(transformedChildren);
    case 'imageReference':
      return [
        'img',
        {
          src: `reference#${node.identifier}`,
          title: node.alt,
          alt: node.alt,
        },
      ];
    default:
      return node;
  }
}

var placeholderParent;
var parentNode;
var definitionRegex = /reference#([^\]]+)/;
// replace __tag_content_placeholder__
function placeholderReplace(item, index) {
  if (item === '' || !item) {
    this.splice(index, 1);
  } else if (placeholderParent) {
    placeholderParent.push(item);
    placeholderParent = null;
    this.splice(index, 1);
    // @hack 修改了当前数组的长度, 会中断 forEach 的下一个值
    parentNode = this;
    this.forEach(placeholderReplace.bind(this));
  } else if (item === 'a') {
    // eslint-disable-next-line no-unused-vars
    var [tag, props, children] = this;
    if (definitionRegex.test(props.href)) {
      var linkRef = definitionRegex.exec(props.href);
      if (linkRef && linkRef[1]) {
        var linkUrl =
          definitionMap[linkRef[1]] && definitionMap[linkRef[1]].url;
        if (linkUrl) {
          props.href = props.href.replace(definitionRegex, linkUrl);
        } else {
          // @fixed https://github.com/noyobo/md2jsonml/issues/11
          // 未指定 reference 还原回字符串
          parentNode[parentNode.length - 1] = `[${children}]`;
        }
      }
    }
  } else if (item === '__tag_content_placeholder__') {
    placeholderParent = this;
    this.splice(index, 1);
  } else if (item && definitionRegex.test(item.src)) {
    var srcRef = definitionRegex.exec(item.src);
    if (srcRef && srcRef[1]) {
      var srcUrl = definitionMap[srcRef[1]] && definitionMap[srcRef[1]].url;
      if (srcUrl) {
        item.src = item.src.replace(definitionRegex, srcUrl);
      }
    }
  } else if (Array.isArray(item)) {
    if (item.length === 0 || item[0] === '') {
      this.splice(index, 1);
    } else {
      parentNode = this;
      item.forEach(placeholderReplace.bind(item));
    }
  }
}

function filterDefinition(item) {
  if (item && item.type === 'definition') {
    definitionMap[item.identifier] = {
      title: item.title,
      url: item.url,
    };
    return false;
  }
  return true;
}

module.exports = (ast) => {
  var markdownData = transformer(ast);

  markdownData = markdownData.filter(filterDefinition);

  markdownData.forEach(placeholderReplace.bind(markdownData));
  return markdownData;
};
