const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const LOADER_NAME = 'Raw Edit Loader'

const schema = require('./options.json')

function makeLoader() {
  const configuration = { name: LOADER_NAME, baseDataPath: 'options' }

  return function (source) {
    const options = getOptions(this)

    if (!options) return source

    validate(schema, options, configuration)

    const { resourcePath } = this

    if (options.group) {
      let originSource = source
      options.group.forEach((opt) => {
        originSource = replace.call(this, originSource, resourcePath, opt)
      })
      return originSource
    }
    return replace.call(this, source, resourcePath, options)
  }
}

function replace(source, resourcePath, options) {
  const {
    pathReg: tmpPathReg,
    pathList,
    replaceReg: tmpReplaceRegStr,
    replacement,
    done,
    regMode = 'g',
  } = options

  const pathReg = getRegExpression(tmpPathReg, regMode)
  const replaceReg = getRegExpression(tmpReplaceRegStr, regMode)

  if (
    (pathReg && pathReg.test(resourcePath)) ||
    (pathList && pathList.includes(resourcePath))
  ) {
    let res = source.replace(replaceReg, replacement)
    done instanceof Function && (res = done.call(this, res))
    return res
  }
  return source
}

function getRegExpression(input, mode = 'g') {
  return input instanceof RegExp ? input : new RegExp(input, mode)
}

module.exports = makeLoader()
exports.replace = replace
