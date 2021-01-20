
const jwt = require('express-jwt')
module.exports = (app) => {
  app.use(jwt({
    secret: process.env.SECRET, 
    algorithms: ['HS256']
  }).unless({path: ['/']}))
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ok: false, msg: 'not authorized'})
    }
  })
  return app
}
