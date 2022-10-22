var errors = 0

console = { log: function(x) {
  errors++
}}

const roboto = require('./Roboto-Bold.ttf')
const base64url = require('base64url')

const robotoArrayBuffer = base64url.toBuffer(roboto.default.replace(/^data:\w+\/\w+;base64,/, ''))

function run() {
  const satori = require('satori')
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
  )
}

function getResult() {
  return svg
}

module.exports = {
  run: run,
  getResult: getResult
}
