const createFilter = require('rollup-pluginutils').createFilter
const MagicString = require('magic-string')

const START_COMMENT = 'start_comment'
const END_COMMENT = 'end_comment'

function stripCode (options = {}) {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'stripCode',

    transform (source, id) {
      if (!filter(id)) return;

      const startComment = options.start_comment || START_COMMENT
      const endComment = options.end_comment || END_COMMENT
      const defaultPattern = new RegExp(`([\\t ]*\\/\\* ?${startComment} ?\\*\\/)[\\s\\S]*?(\\/\\* ?${endComment} ?\\*\\/[\\t ]*\\n?)`, 'g')
      const pattern = options.pattern || defaultPattern
      let map
      let code = source.replace(pattern, '')

      if (options.sourceMap !== false && options.sourcemap !== false) {
        const magicString = new MagicString(code)
        map = magicString.generateMap({hires: true})
      }

      return {code, map}
    }
  }
}

module.exports = stripCode