import test from 'tappedout'
import {
  typeOf,
  converge,
  nullIf,
  coalesce,
  coalesceb,
  getPrimitive
} from '@ngnjs/libdata'

const EmptyFn = function () { }

test('typeOf', function (t) {
  t.ok(typeOf('test') === 'string', 'typeof recognizes strings.')
  t.ok(typeOf(1) === 'number', 'typeof recognizes numbers.')
  t.ok(typeOf(true) === 'boolean', 'typeof recognizes booleans.')
  t.ok(typeOf(/\s{1,10}/gi) === 'regexp', 'typeof recognizes regular expressions.')
  t.ok(typeOf({}) === 'object', 'typeof recognizes objects.')
  t.ok(typeOf(EmptyFn) === 'EmptyFn', 'typeof recognizes unique function names as types.')
  t.ok(typeOf([]) === 'array', 'typeof recognizes arrays.')
  t.ok(typeOf(null) === 'null', 'typeof recognizes null.')
  t.ok(typeOf() === 'undefined', 'typeof recognizes undefined.')

  function myFn () { }
  t.ok(typeOf(myFn) === 'myFn', 'typeof recognizes custom function names.')

  class myClass {
    constructor () {
      console.log('Nothing')
    }
  }
  t.ok(typeOf(myClass) === 'myClass', 'typeof recognizes classes.')

  t.ok(typeOf(() => { console.log('nothing') }) === 'function', 'typeof recognizes fat arrow methods as functions.')

  t.end()
})

test('nullIf', function (t) {
  t.expect(null, nullIf(''), 'nullIf identifies blank/empty strings as null by default.')
  t.expect(null, nullIf('test', 'test'), 'nullIf returns null for matching values.')
  t.expect('test', nullIf('test'), 'nullIf returns non-blank/empty values by default.')
  t.expect('test', nullIf('test', 'not_test'), 'nullIf return test value when it does not match the null qualifier.')

  var obj = {}

  t.ok(
    nullIf({}) !== null &&
    nullIf(1) === 1 &&
    nullIf(true) === true &&
    nullIf(false) === false &&
    nullIf(EmptyFn) !== null &&
    nullIf(obj, obj) === null &&
    nullIf(EmptyFn, EmptyFn) === null &&
    nullIf(1, 1) === null &&
    nullIf(true, true) === null,
    'nullIf works with non-string arguments'
  )

  t.end()
})

test('converge', function (t) {
  t.ok(converge(false, null, undefined, '', 'test') === '', 'converge recognizes blank values as valid arguments.')
  t.ok(converge(false, null, undefined, true, 'test') === true, 'converge recognizes boolean values as valid arguments.')
  t.ok(converge(true, null, undefined, '', 'test') === 'test', 'converge skips blank values when requested.')
  t.end()
})

test('coalesce', function (t) {
  t.ok(coalesce(null, undefined, '', 'test') === '', 'coalesce recognizes blank values as valid arguments.')
  t.ok(coalesce(null, undefined, true, 'test') === true, 'coalesce recognizes boolean values as valid arguments.')
  t.ok(coalesce(null, undefined, '', 'test') === '', 'coalesce does not skip blank values.')
  t.end()
})

test('coalesceb', function (t) {
  t.ok(coalesceb(null, undefined, true, 'test') === true, 'coalesceb recognizes boolean values as valid arguments.')
  t.ok(coalesceb(null, undefined, '', 'test') === 'test', 'coalesceb ignores blank/empty string values.')
  t.end()
})

test('getPrimitive', function (t) {
  t.expect(Number, getPrimitive('number'), 'getPrimitive identifies number.')
  t.expect(RegExp, getPrimitive('regexp'), 'getPrimitive identifies regexp.')
  t.expect(RegExp, getPrimitive('regex'), 'getPrimitive identifies regex w/ warning.')
  t.expect(Boolean, getPrimitive('boolean'), 'getPrimitive identifies boolean.')
  t.expect(Symbol, getPrimitive('symbol'), 'getPrimitive identifies symbol.')
  t.expect(Date, getPrimitive('date'), 'getPrimitive identifies date.')
  t.expect(Array, getPrimitive('array'), 'getPrimitive identifies array.')
  t.expect(Object, getPrimitive('object'), 'getPrimitive identifies object.')
  t.expect(Function, getPrimitive('function'), 'getPrimitive identifies function.')
  t.expect(String, getPrimitive('string'), 'getPrimitive identifies string.')
  t.expect(String, getPrimitive('nada', String), 'getPrimitive identifies default type.')
  t.expect(undefined, getPrimitive('nada'), 'getPrimitive defaults to undefined when no type is recognized.')

  t.end()
})
