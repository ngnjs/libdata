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
  t.ok(typeOf(EmptyFn) === 'emptyfn', 'typeof recognizes unique function names as types.')
  t.ok(typeOf([]) === 'array', 'typeof recognizes arrays.')
  t.ok(typeOf(null) === 'null', 'typeof recognizes null.')
  t.ok(typeOf() === 'undefined', 'typeof recognizes undefined.')

  function myFn () { }
  t.ok(typeOf(myFn) === 'myfn', 'typeof recognizes custom function names.')

  class myClass {
    constructor () {
      console.log('Nothing')
    }
  }
  t.ok(typeOf(myClass) === 'myclass', 'typeof recognizes classes.')

  t.ok(typeOf(() => { console.log('nothing') }) === 'function', 'typeof recognizes fat arrow methods as functions.')

  t.end()
})

test('nullIf', function (t) {
  t.ok(nullIf('') === null, 'nullIf identifies blank/empty strings as null by default.')
  t.ok(nullIf('test', 'test') === null, 'nullIf returns null for matching values.')
  t.ok(nullIf('test') === 'test', 'nullIf returns non-blank/empty values by default.')
  t.ok(nullIf('test', 'not_test') === 'test', 'nullIf return test value when it does not match the null qualifier.')

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
  t.ok(getPrimitive('number') === Number, 'getPrimitive identifies number.')
  t.ok(getPrimitive('regexp') === RegExp, 'getPrimitive identifies regexp.')
  t.ok(getPrimitive('regex') === RegExp, 'getPrimitive identifies regex w/ warning.')
  t.ok(getPrimitive('boolean') === Boolean, 'getPrimitive identifies boolean.')
  t.ok(getPrimitive('symbol') === Symbol, 'getPrimitive identifies symbol.')
  t.ok(getPrimitive('date') === Date, 'getPrimitive identifies date.')
  t.ok(getPrimitive('array') === Array, 'getPrimitive identifies array.')
  t.ok(getPrimitive('object') === Object, 'getPrimitive identifies object.')
  t.ok(getPrimitive('function') === Function, 'getPrimitive identifies function.')
  t.ok(getPrimitive('string') === String, 'getPrimitive identifies string.')
  t.ok(getPrimitive('nada', String) === String, 'getPrimitive identifies default type.')
  t.ok(getPrimitive('nada') === undefined, 'getPrimitive defaults to undefined when no type is recognized.')

  t.end()
})
