const createFilter = require('rollup-pluginutils').createFilter
const MagicString = require('magic-string')

const START_COMMENT = 'start_comment'
const END_COMMENT = 'end_comment'

function stripCode (options = {}) {
  const {include, exclude, sourceMap, pattern, sourcemap} = options

  const filter = createFilter(include, exclude)

  return {
    name: 'stripCode',

    transform (source, id) {
      if (!filter(id)) return

      const startComment = options.start_comment || START_COMMENT
      const endComment = options.end_comment || END_COMMENT
      const defaultPattern = new RegExp(`([\\t ]*\\/\\* ?${startComment} ?\\*\\/)[\\s\\S]*?(\\/\\* ?${endComment} ?\\*\\/[\\t ]*\\n?)`, 'g')
      let map
      let code = source.replace(pattern || defaultPattern, '')

      if (sourceMap !== false && sourcemap !== false) {
        const magicString = new MagicString(code)
        map = magicString.generateMap({hires: true})
      }

      return {code, map}
    }
  }
}

module.exports = stripCode