import test from 'tappedout'
import {
  dedupe,
  forceArray,
  forceBoolean,
  forceNumber,
  forceString
} from '@ngnjs/libdata'

test('dedupe', function (t) {
  let test = dedupe(['a', 'b', 'a', 'c', 'a', 'd', 'b', 'e', 'e'])

  t.ok(
    test[0] === 'a' &&
    test[1] === 'b' &&
    test[2] === 'c' &&
    test[3] === 'd' &&
    test[4] === 'e',
    'dedupe removes duplicate items from a simple array'
  )

  const obj = {
    a: 'a',
    b: 'b',
    c: true
  }

  test = ['a', obj, obj]
  const match = dedupe(test)

  test.pop()

  t.ok(
    test[0] === match[0] &&
    test[1] === match[1],
    'dedupe works with complex array values.'
  )

  t.end()
})

test('forceArray', function (t) {
  t.ok('array', Array.isArray(forceArray('test')), 'Non-array converted to array.')
  t.ok('array', Array.isArray(forceArray(['a'])), 'Array remains untouched.')
  t.expect('a', forceArray(['a'])[0], 'Forcing an array returns the original array.')
  t.end()
})

test('forceBoolean', function (t) {
  t.expect('boolean', typeof forceBoolean('test'), 'Non-boolean converted to boolean.')
  t.expect(false, forceBoolean(0), 'Number converted to boolean.')
  t.expect('boolean', typeof forceBoolean(false), 'Boolean type remains untouched.')
  t.expect(false, forceBoolean(false), 'Boolean value remains untouched.')
  t.end()
})

test('forceNumber', function (t) {
  const dt = new Date(Date.UTC(2000, 1, 1))

  t.expect(949363200000, forceNumber(dt), 'Parsing date into time since epoch succeeds.')
  t.ok(forceNumber(true) === 1 && forceNumber(false) === 0, 'Parsing boolean succeeds.')
  t.expect(100.1, forceNumber('100.1'), 'Float parsing succeeds.')
  t.expect(100, forceNumber('100.1', 10), 'Integer parsing succeeds.')

  t.end()
})

test.only('forceString', function (t) {
  class XClass {
    demo () {}
  }
  function stringtest () {}
  const dt = new Date(Date.UTC(2000, 1, 1))
  const RE = /(.*)/gi
  const s = Symbol.for('string.test')

  t.expect('1', forceString(1), 'Convert number.')
  t.expect('false', forceString(false), 'Convert boolean.')
  t.expect('null', forceString(null), 'Convert null.')
  t.expect('undefined', forceString(undefined), 'Convert undefined.')
  t.expect('a,b,c', forceString(['a', 'b', 'c']), 'Convert array.')
  t.expect('{"a":true}', forceString({ a: true }), 'Convert object.')
  t.expect('2000-02-01T00:00:00.000Z', forceString(dt), 'Convert date.')
  t.expect('/(.*)/gi', forceString(RE), 'Convert RegExp.')
  t.expect('Symbol(string.test)', forceString(s), 'Convert Symbol.')
  t.expect('stringtest', forceString(stringtest), 'Convert function.')
  t.expect('XClass', forceString(XClass), 'Convert .')
  t.expect('[object Map]', forceString(new Map()), 'Convert Map.')
  t.expect('[object Set]', forceString(new Set()), 'Convert Set.')

  t.end()
})