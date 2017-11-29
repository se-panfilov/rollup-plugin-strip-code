import buble from 'rollup-plugin-buble'

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies).concat('path')

export default {
  entry: 'index.js',
  plugins: [buble()],
  external: external,
  targets: [
    {
      format: 'cjs',
      dest: pkg['main']
    },
    {
      format: 'es6',
      dest: pkg['jsnext:main']
    }
  ]
}
