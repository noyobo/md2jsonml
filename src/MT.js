'use strict';

const remark = require('remark');
const transformer = require('./transformer');

module.exports = function MT(markdown) {
  const ret = {};

  const ast = remark.parse(markdown);
  ret.content = transformer(ast);

  return ret;
};
