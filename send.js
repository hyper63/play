const { Async } = require('crocks')
const { lensProp, over, set } = require('ramda')
const express = require('express')
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const validateRequestBody = require('./lib/validate-request')
const validateContext = require('./lib/validate-context')


// create mail transport
const createTransport = smtp => nodemailer.createTransport(smtp)
const createToken = (sub, secret) => jwt.sign({sub}, secret, { expiresIn: '90d' })
const sendEmail = (transporter, sub, token, from) => transporter({
  from: from,
  to: sub,
  subject: 'hyper63 playground service ⚡⚡',
  text: `
## Access Token

This token is good for 90 days!

${token}

Thank you for trying play.hyper63.com

Check out our docs: https://docs.hyper63.com

`,
  html: `
<h1>Access Token</h1>
<p>This token is good for 90 days</p>
<pre><code>${token}</code></pre>
<p>Thank you for trying play.hyper63.com</p>
<p>Check out our docs: <a href="https://docs.hyper63.com">Documentation</a></p>
`
})
/** 
 * @typedef {Object} ctx
 * @property {string} sub 
 * @property {Object} transporter
 * @property {string} token
 */
const createContext = (from, api_key, domain) => ({email}) => ({ 
  mg: { api_key, domain },
  sub: email, from 
})
//
const doCreateTransport = smtp => ctx => 
  over(lensProp('transporter'), () => {
    try {
      let t = createTransport(smtp)
      return t.sendMail.bind(t)
    } catch (e) {
      console.log(e)
      return null
    }
  }, ctx)

const doCreateToken = secret => ctx => 
  over(lensProp('token'), () => createToken(ctx.sub, secret), ctx)


const doSendEmail = (ctx) => 
  Async.of(ctx)
    .map(
      over(lensProp('mg'), auth => nodemailer.createTransport(mg({auth})))
    )
    .chain(({mg, sub, token, from}) => 
      Async.fromNode(mg.sendMail.bind(mg))({
        from,
        to: sub,
        subject: 'play.hyper63 token request',
        text: token
      })
    )

const handleError = res => error => res.status(500).json({ error })
const handleSuccess = res => success => res.status(201).json({ ok: true, result: success })

//-----------------------------------------
//

module.exports = app => {
  app.post('/client/access', express.json(), (req, res) => {
    Async.of(req.body)
      .chain(validateRequestBody)
      .map(createContext(
        process.env.MG_FROM, 
        process.env.MG_KEY,
        process.env.MG_DOMAIN
      ))
      .map(doCreateToken(process.env.SECRET))
      .chain(validateContext)
      .chain(doSendEmail)
      //.chain(logTransaction)
      // .runWith({})
      .fork(
        handleError(res),
        handleSuccess(res)
      )
  })
  return app
}
