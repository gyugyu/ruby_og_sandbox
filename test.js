console = console || { log: function(x) {
}}

const roboto = require('./Roboto-Bold.ttf')
const base64url = require('base64url')
const { Resvg, initWasm } = require('@resvg/resvg-wasm')
const wasm = require('./node_modules/@resvg/resvg-wasm/index_bg.wasm')
const { Buffer } = require('buffer')

const robotoArrayBuffer = base64url.toBuffer(roboto.default.replace(/^data:\w+\/\w+;base64,/, ''))
const wasmArrayBuffer = base64url.toBuffer(wasm.default.replace(/^data:\w+\/\w+;base64,/, ''))

function run() {
  const satori = require('satori')
  let svg = null
  return satori.default(
    {
      type: 'div',
      props: {
        children: 'hello, world',
        style: { color: 'black' },
      },
    },
    {
      width: 600,
      height: 400,
      fonts: [
        {
          name: 'Roboto',
          data: robotoArrayBuffer,
          weight: 400,
          style: 'normal',
        }
      ],
    },
  ).then(s => {
    svg = s
    return initWasm(wasmArrayBuffer)
  }).then(() => {
    const opts = {
      background: 'rgba(238, 235, 230, .9)',
    }
    const resvg = new Resvg(svg, opts)
    const pngData = resvg.render()
    return Buffer.from(pngData.buffer).toString('base64')
  })
}

module.exports = {
  run: run
}
