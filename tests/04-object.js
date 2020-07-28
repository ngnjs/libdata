import test from 'tappedout'
import { object } from '@ngnjs/libdata'

test('Object: Missing Properties', function (t) {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    e: 5
  }

  const missing = object.missing(obj, 'a', 'b', 'c', 'd', 'e', 'f')
  t.ok(missing[0] === 'd' && missing[1] === 'f', 'Returns list of missing attributes.')

  t.end()
})

test('Object: Extraneous Properties', function (t) {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6
  }

  const extra = object.extraneous(obj, 'a', 'b', 'c', 'e')

  t.ok(extra[0] === 'd' && extra[1] === 'f', 'Returns list of extraneous attributes.')

  t.end()
})

test('Object: Has All Properties', function (t) {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    e: 5
  }

  const check = object.all(obj, 'a', 'b', 'c')
  const badCheck = object.all(obj, 'a', 'b', 'c', 'd')

  t.ok(typeof check === 'boolean' && check, 'Responds with a proper true value.')
  t.ok(typeof badCheck === 'boolean' && !badCheck, 'Responds with a proper false value.')

  t.end()
})

test('Object: Has Any Property', function (t) {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    e: 5
  }

  const check = object.any(obj, 'a', 'b', 'c', 'd')
  const badCheck = object.any(obj, 'x', 'y', 'z')

  t.ok(typeof check === 'boolean' && check, 'Responds with a proper boolean value.')
  t.ok(!badCheck, 'Responds with false when none of the specificed properties exist.')

  t.end()
})

test('Object: Has Specific Properties (Exact Match)', function (t) {
  const obj = {
    a: 1,
    b: 2,
    c: 3
  }

  const justRight = object.exactly(obj, 'a', 'b', 'c')
  const tooMany = object.exactly(obj, 'a', 'b', 'c', 'd')
  const tooFew = object.exactly(obj, 'a', 'b')

  t.ok(justRight, 'Exact match returns true.')
  t.ok(!tooMany, 'Inexact match returns false (too many).')
  t.ok(!tooFew, 'Inexact match returns false (too few).')

  t.end()
})

test('Object: Required Properties', function (t) {
  const obj = {
    a: 1,
    b: 2,
    c: 3
  }

  t.doesNotThrow(() => object.require(obj, 'a', 'b', 'c'), 'Object with correct attributes does not throw an error.')
  t.doesNotThrow(() => object.require(obj, 'a', 'b'), 'Object with correct attributes does not throw an error (even if more attributes exist).')
  t.throws(() => object.require(obj, 'a', 'b', 'x'), 'Object with incorrect attributes throws an error.')

  t.end()
})

const isEnumerable = (obj, property) => Object.keys(obj).indexOf(property) >= 0

test('Object: Mixin', t => {
  const s = Symbol()
  const obj = {
    a: 'a',
    b: true
  }

  Object.defineProperty(obj, 'hidden', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: 'shy'
  })

  obj[s] = 'symbolic'

  const dest = {
    b: false,
    c: 'c'
  }

  object.mixin(obj, dest)
  t.expect('a', dest.a, 'Inherits basic attribute')
  t.expect(true, dest.b, 'Overwrites conflicting attribute by default')
  t.expect('c', dest.c, 'Does not remove pre-existing attribute')
  t.expect('symbolic', dest[s], 'Inherits symbol attribute')
  t.expect('shy', dest.hidden, 'Inherits non-enumerable attributes.')

  const dest2 = {
    b: false,
    c: 'c'
  }
  object.mixin(obj, dest2, false)
  t.expect(false, dest2.b, 'Does not overwrite conflicting attribute when configured not to.')

  const dest3 = {
    b: false,
    c: 'c'
  }
  object.mixin(obj, dest2, attr => attr === 'b')
  t.expect(false, dest3.b, 'Does not overwrite conflicting attribute when configured not to with a function.')

  const obj2 = {}

  Object.defineProperties(obj2, {
    a: { enumerable: true, value: 'a' },
    b: { enumerable: false, value: 'b' },
    c: { enumerable: true, writable: false, value: 'c' },
    d: { enumerable: false, writable: false, value: 'd' }
  })

  const target = {}

  object.mixin(obj2, target)

  try { target.c = 'changed' } catch (e) { }
  try { target.d = 'changed' } catch (e) { }

  t.ok(
    target.a === 'a' &&
    target.b === 'b' &&
    target.c === 'c' &&
    target.d === 'd' &&
    !isEnumerable(target, 'b') &&
    !isEnumerable(target, 'd'),
    'object.mixin applies source descriptors to a target object.'
  )

  t.end()
})

const { serialize } = object

test('Object: Serialize', t => {
  let data = {
    a: 1,
    b: true,
    c: 'three'
  }

  const originalData = Object.assign({}, data)

  data[Symbol('test')] = 'symbol'
  data.fn = function () { }
  data = serialize(data)
  t.expect(JSON.stringify(originalData), JSON.stringify(data), 'Serialization returns an object stripped of functions.')

  data.d = /^s.*/
  originalData.d = '/^s.*/'
  t.expect(JSON.stringify(originalData), JSON.stringify(serialize(data)), 'Serialization returns an object with proper RegEx conversion (to string).')

  const dt = new Date(2000, 1, 1, 0, 0, 0)
  data.dt = dt
  originalData.dt = dt.toISOString()
  t.expect(JSON.stringify(originalData), JSON.stringify(serialize(data)), 'Serialization returns an object with proper date conversion (to ISO string).')

  t.end()
})
