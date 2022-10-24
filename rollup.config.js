const url = require('@rollup/plugin-url')
const json = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const nodePolyfill = require('rollup-plugin-node-polyfills')

module.exports = {
  input: 'test.js',
  output: {
    file: 'build.js',
    format: 'iife',
    name: 'satori',
    sourcemap: 'inline',
  },
  plugins: [
    url({
      limit: 10000000000,
      include: ['**/*.ttf', '**/*.wasm']
    }),
    json(),
    commonjs(),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.es6'],
    }),
    {
      name: 'replace-code',
      transform (code, id) {
        if (!/nbind/.test(id)) return
        code = code.replace('_a = _typeModule(_typeModule),', 'var _a = _typeModule(_typeModule);')
        return {
          code,
          map: { mappings: '' }
        }
      }
    },
    nodePolyfill(),
  ]
}
