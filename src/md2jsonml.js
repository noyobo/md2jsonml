var remark = require('remark')
var transformer = require('./transformer')

module.exports = function MT (markdown) {
  var ast = remark.parse(markdown)
  var jsonml = transformer(ast)
  return jsonml
}
