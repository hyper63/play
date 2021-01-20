
const jwt = require('express-jwt')
module.exports = (app) => {
  app.use(/^\/(data|search|storage|cache)/, jwt({
    secret: process.env.SECRET, 
    algorithms: ['HS256']
  }))
  return app
}
