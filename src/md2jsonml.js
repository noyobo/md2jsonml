'use strict';

const remark = require('remark');
const transformer = require('./transformer');

module.exports = function MT(markdown) {
  const ast = remark.parse(markdown);
  const jsonml = transformer(ast);
  return jsonml;
};
