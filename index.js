if (!process.env.DATA) {
  throw new Error('ENV VARIABLE DATA is required!')
}

if (!process.env.SECRET) {
  throw new Error('ENV VARIABLE SECRET is required!')
}

const apm = require('elastic-apm-node').start()

const config = require('./hyper63.config.js')
const app = require('@hyper63/core')(config)


