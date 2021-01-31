const z = require('zod')
const { compose, equals, prop, ifElse } = require('ramda')
const { Async, eitherToAsync, Either } = require('crocks')
const { Left, Right } = Either

const schema = z.object({
  mg: z.unknown(),
  sub: z.string().email(),
  token: z.string(),
  from: z.string().email()
})

const test = compose(equals(true), prop('success'))
const success = compose(Right, prop('data'))
const error = compose(Left, prop('error'))

module.exports = ctx => 
  Async.of(schema.safeParse(ctx))
    .map(ifElse(test, success, error))
    .chain(eitherToAsync)


