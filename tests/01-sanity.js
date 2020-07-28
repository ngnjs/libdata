import test from 'tappedout'
import * as util from '@ngnjs/libdata'

test('Sanity', t => {
  t.expect('object', typeof util, 'Utility lib consists of key/values.')
  t.expect('function', typeof util.dedupe, 'Array dedupe function exists.')
  t.expect('function', typeof util.forceArray, 'forceArray function exists.')
  t.expect('function', typeof util.forceBoolean, 'forceBoolean function exists.')
  t.expect('function', typeof util.forceNumber, 'forceNumber function exists.')
  t.expect('function', typeof util.object.all, 'object.all function exists.')
  t.expect('function', typeof util.object.any, 'object.any function exists.')
  t.expect('function', typeof util.object.exactly, 'object.exactly function exists.')
  t.expect('function', typeof util.object.require, 'object.require function exists.')
  t.expect('function', typeof util.object.extraneous, 'object.extraneous function exists.')
  t.expect('function', typeof util.object.missing, 'object.missing function exists.')
  t.expect('function', typeof util.object.mixin, 'object.mixin function exists.')
  t.expect('function', typeof util.typeOf, 'typeOf function exists.')
  t.expect('function', typeof util.converge, 'converge function exists.')
  t.expect('function', typeof util.nullIf, 'nullIf function exists.')
  t.expect('function', typeof util.coalesce, 'coalesce function exists.')
  t.expect('function', typeof util.coalesceb, 'coalesceb function exists.')
  t.expect('function', typeof util.getPrimitive, 'getPrimitive function exists.')
  t.end()
})
