const z = require('zod')
const { compose, equals, prop, ifElse } = require('ramda')
const { Async, eitherToAsync, Either } = require('crocks')
const { Left, Right } = Either

const schema = z.object({
  email: z.string().email()
})

const test = compose(equals(true), prop('success'))
const success = compose(Right, prop('data'))
const error = compose(Left, prop('error'))

module.exports = requestBody => 
  Async.of(schema.safeParse(requestBody))
    .map(v => { console.log('body', v); return v; })
    .map(ifElse(test, success, error))
    .chain(eitherToAsync)

