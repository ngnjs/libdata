import test from 'tappedout'
import {
  dedupe,
  forceArray,
  forceBoolean,
  forceNumber
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
