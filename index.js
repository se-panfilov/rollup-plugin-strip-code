import MagicString from 'magic-string'

const START_COMMENT = 'start_comment'
const END_COMMENT = 'end_comment'

export default function stripCode (options = {}) {
  return {
    name: 'stripCode',

    transform (code) {
      const start_comment = options.start_comment || START_COMMENT
      const end_comment = options.end_comment || END_COMMENT
      const defaultPattern = new RegExp("([\\t ]*\\/\\* ?" + start_comment + " ?\\*\\/)[\\s\\S]*?(\\/\\* ?" + end_comment + " ?\\*\\/[\\t ]*\\n?)", "g")
      const pattern = options.pattern || defaultPattern
      let map
      let code = code.replace(pattern, "")

      if (options.sourceMap !== false && options.sourcemap !== false) {
        const magicString = new MagicString(code)
        map = magicString.generateMap({hires: true})
      }

      return {code, map};
    }
  }
}

module.exports = stripCode