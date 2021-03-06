const memory = require('@hyper63/adapter-memory')
const pouchdb = require('@hyper63/adapter-pouchdb')
const fs = require('@hyper63/adapter-fs')
const minisearch = require('@hyper63/adapter-minisearch')
const express = require('@hyper63/app-express')
const jwt = require('./jwt')
const static = require('./static')
const send = require('./send')

module.exports = {
  app: express,
  adapters: [
    { port: 'cache', plugins: [memory()]},
    { port: 'data', plugins: [pouchdb({dir: process.env.DATA})]},
    { port: 'storage', plugins: [fs({dir: process.env.DATA})]},
    { port: 'search', plugins: [minisearch()]}
  ],
  middleware: [jwt, static, send]
}
